'use client';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { Controller, useForm } from 'react-hook-form';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import SvgIcon from '@/components/SvgIcon';
import useConfig from '@/hooks/useConfig';
import useTranslation from '@/hooks/useTranslation';
import { submitApplicationForm } from '@/api/apply';
import { getEmailSchema, getFirstNameSchema, getLastNameSchema } from '@/utils/validationSchema';

/***************************  FORM - FIELD LABEL  ***************************/

function FieldLabel({ name, required }) {
  return (
    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
      {name}
      {required && ' *'}
    </Typography>
  );
}

/***************************  FORM - ERROR MESSAGE  ***************************/

function ErrorMessage({ message }) {
  return (
    <Typography variant="caption" sx={{ color: 'error.main' }}>
      {message}
    </Typography>
  );
}

/***************************  APPLY FORM  ***************************/

export default function ApplyForm({ vacancies = [], defaultPosition = '' }) {
  const { t } = useTranslation();
  const { language } = useConfig();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({ defaultValues: { position: defaultPosition } });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [cvError, setCvError] = useState('');
  const cvInputRef = useRef(null);

  const activeVacancies = vacancies.filter((v) => v.isActive);

  const handleCvChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setCvError('');
    }
  };

  const handleCvRemove = (e) => {
    e.preventDefault();
    setCvFile(null);
    setCvError('');
    if (cvInputRef.current) cvInputRef.current.value = '';
  };

  const onSubmit = async (data) => {
    setCvError('');
    if (!cvFile) {
      setCvError(t('vacancies.applyForm.validation.cvRequired'));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append('name', `${data.firstName} ${data.lastName}`);
      formData.append('email', data.email);
      if (data.phone) formData.append('phone', data.phone);
      formData.append('position', data.position === 'open' ? t('vacancies.applyForm.openApplication') : t(activeVacancies.find((v) => v.slug === data.position)?.titleKey || data.position));
      formData.append('motivation', data.motivation);
      formData.append('cv', cvFile);

      const result = await submitApplicationForm(formData, language);
      setSubmitStatus({ type: 'success', message: result.message });
      reset();
      setCvFile(null);
      if (cvInputRef.current) cvInputRef.current.value = '';
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Grid container spacing={2.5}>
          {/* First Name */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.firstName')} required />
              <OutlinedInput
                {...register('firstName', getFirstNameSchema(t))}
                placeholder={t('forms.firstName')}
                fullWidth
                error={!!errors.firstName}
                slotProps={{ input: { 'aria-label': 'First name' } }}
              />
              {errors.firstName?.message && <ErrorMessage message={errors.firstName.message} />}
            </Stack>
          </Grid>

          {/* Last Name */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.lastName')} required />
              <OutlinedInput
                {...register('lastName', getLastNameSchema(t))}
                placeholder={t('forms.lastName')}
                fullWidth
                error={!!errors.lastName}
                slotProps={{ input: { 'aria-label': 'Last name' } }}
              />
              {errors.lastName?.message && <ErrorMessage message={errors.lastName.message} />}
            </Stack>
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.email')} required />
              <OutlinedInput
                {...register('email', getEmailSchema(t))}
                placeholder={t('forms.emailPlaceholder')}
                fullWidth
                error={!!errors.email}
                slotProps={{ input: { 'aria-label': 'Email address' } }}
              />
              {errors.email?.message && <ErrorMessage message={errors.email.message} />}
            </Stack>
          </Grid>

          {/* Phone (optional) */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.phone')} />
              <OutlinedInput
                {...register('phone')}
                placeholder={t('forms.phonePlaceholder')}
                fullWidth
                slotProps={{ input: { 'aria-label': 'Phone number' } }}
              />
            </Stack>
          </Grid>

          {/* Position */}
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('vacancies.applyForm.position')} required />
              <FormControl fullWidth error={!!errors.position}>
                <Controller
                  name="position"
                  control={control}
                  defaultValue=""
                  rules={{ required: t('vacancies.applyForm.validation.positionRequired') }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <Typography component="span" sx={{ color: 'text.disabled' }}>
                              {t('vacancies.applyForm.positionPlaceholder')}
                            </Typography>
                          );
                        }
                        if (selected === 'open') return t('vacancies.applyForm.openApplication');
                        const vacancy = activeVacancies.find((v) => v.slug === selected);
                        return vacancy ? t(vacancy.titleKey) : selected;
                      }}
                    >
                      {activeVacancies.map((vacancy) => (
                        <MenuItem key={vacancy.slug} value={vacancy.slug}>
                          {t(vacancy.titleKey)}
                        </MenuItem>
                      ))}
                      <MenuItem value="open">{t('vacancies.applyForm.openApplication')}</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              {errors.position?.message && <ErrorMessage message={errors.position.message} />}
            </Stack>
          </Grid>

          {/* Motivation */}
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('vacancies.applyForm.motivation')} required />
              <OutlinedInput
                {...register('motivation', { required: t('vacancies.applyForm.validation.motivationRequired') })}
                multiline
                rows={5}
                placeholder={t('vacancies.applyForm.motivationPlaceholder')}
                fullWidth
                error={!!errors.motivation}
                slotProps={{ input: { 'aria-label': 'Motivation' } }}
              />
              {errors.motivation?.message && <ErrorMessage message={errors.motivation.message} />}
            </Stack>
          </Grid>

          {/* CV Upload */}
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('vacancies.applyForm.cv')} required />
              {cvFile ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 2,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 4,
                    bgcolor: 'primary.lighter'
                  }}
                >
                  <SvgIcon name="tabler-file-check" size={24} color="primary.main" />
                  <Typography variant="body2" sx={{ color: 'primary.dark', fontWeight: 500, flex: 1, wordBreak: 'break-all' }}>
                    {cvFile.name}
                  </Typography>
                  <IconButton size="small" onClick={handleCvRemove} aria-label="Remove CV" sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                    <SvgIcon name="tabler-x" size={18} />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  component="label"
                  htmlFor="cv-upload-input"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    p: 4,
                    border: '2px dashed',
                    borderColor: cvError ? 'error.main' : 'divider',
                    borderRadius: 4,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: 'primary.main' }
                  }}
                >
                  <SvgIcon name="tabler-upload" size={40} color="text.secondary" />
                  <Typography variant="h6">{t('vacancies.applyForm.cvHelper')}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t('forms.attachmentSize')}
                  </Typography>
                </Box>
              )}
              <input
                id="cv-upload-input"
                ref={cvInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                hidden
                onChange={handleCvChange}
              />
              {cvError && <ErrorMessage message={cvError} />}
            </Stack>
          </Grid>
        </Grid>

        {/* Submit */}
        <Box sx={{ textAlign: 'center' }}>
          <ButtonAnimationWrapper>
            <Button type="submit" color="primary" size="large" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? t('common.loading') : t('vacancies.applyForm.submit')}
            </Button>
          </ButtonAnimationWrapper>
        </Box>

        {/* Status message */}
        {submitStatus && (
          <Box
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 3,
              bgcolor: submitStatus.type === 'success' ? 'success.lighter' : 'error.lighter',
              border: '2px solid',
              borderColor: submitStatus.type === 'success' ? 'success.main' : 'error.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}
          >
            <SvgIcon
              name={submitStatus.type === 'success' ? 'tabler-circle-check' : 'tabler-alert-circle'}
              color={submitStatus.type === 'success' ? 'success.main' : 'error.main'}
              size={24}
            />
            <Stack sx={{ gap: 0.25, flex: 1, alignItems: 'center', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: submitStatus.type === 'success' ? 'success.darker' : 'error.darker', fontWeight: 600 }}>
                {submitStatus.type === 'success' ? t('common.success') : t('common.error')}
              </Typography>
              <Typography variant="body2" sx={{ color: submitStatus.type === 'success' ? 'success.darker' : 'error.darker' }}>
                {submitStatus.message}
              </Typography>
            </Stack>
          </Box>
        )}
      </Stack>
    </form>
  );
}

FieldLabel.propTypes = { name: PropTypes.string, required: PropTypes.bool };
ErrorMessage.propTypes = { message: PropTypes.string };

ApplyForm.propTypes = {
  vacancies: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      titleKey: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired
    })
  ),
  defaultPosition: PropTypes.string
};

'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  VACANCY HEADER - 1  ***************************/

export default function VacancyHeader1({ titleKey, introKey, type, location, hoursKey, contractKey }) {
  const { t } = useTranslation();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <MotionWrapper>
        <Stack sx={{ alignItems: 'center', textAlign: 'center', gap: { xs: 3, md: 4 } }}>
          <Chip label={t(`vacancies.types.${type}`)} color="primary" sx={{ fontWeight: 600, borderRadius: 2 }} />

          <Typeset
            heading={t(titleKey)}
            caption={t(introKey)}
            stackProps={{ sx: { gap: 2, alignItems: 'center', maxWidth: 720, mx: 'auto' } }}
            headingProps={{ variant: 'h1' }}
            captionProps={{ variant: 'body1', sx: { fontSize: { xs: '1rem', md: '1.125rem' } } }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: { xs: 1.5, sm: 4 }, alignItems: 'center', justifyContent: 'center' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <SvgIcon name="tabler-map-pin" size={18} color="text.secondary" />
              <Typography variant="body1" color="text.secondary">
                {location}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <SvgIcon name="tabler-clock" size={18} color="text.secondary" />
              <Typography variant="body1" color="text.secondary">
                {t(hoursKey)}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <SvgIcon name="tabler-file-text" size={18} color="text.secondary" />
              <Typography variant="body1" color="text.secondary">
                {t(contractKey)}
              </Typography>
            </Stack>
          </Stack>

          <Button component={NextLink} href="#apply" variant="contained" color="primary" size="large">
            {t('vacancies.detail.applyNow')}
          </Button>
        </Stack>
      </MotionWrapper>
    </ContainerWrapper>
  );
}

VacancyHeader1.propTypes = {
  titleKey: PropTypes.string.isRequired,
  introKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  hoursKey: PropTypes.string.isRequired,
  contractKey: PropTypes.string.isRequired
};

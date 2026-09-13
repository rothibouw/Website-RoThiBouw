'use client';
import PropTypes from 'prop-types';

// @react
import { useMemo, useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY, BORDER_RADIUS } from '@/utils/constant';

/***************************  VACANCY - CARD  ***************************/

function VacancyCard({ vacancy }) {
  const { t } = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        height: 1,
        p: { xs: 2.5, sm: 3 },
        borderRadius: BORDER_RADIUS.xs,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': { borderColor: 'primary.main', boxShadow: 2 }
      }}
    >
      <Stack sx={{ gap: 1 }}>
        <Typography variant="h4" component="h3">
          {t(vacancy.titleKey)}
        </Typography>
        <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
          <Chip size="small" icon={<SvgIcon name="tabler-map-pin" size={14} />} label={vacancy.location} />
          <Chip size="small" icon={<SvgIcon name="tabler-clock" size={14} />} label={t(vacancy.hoursKey)} />
          <Chip size="small" icon={<SvgIcon name="tabler-file-text" size={14} />} label={t(vacancy.contractKey)} />
        </Stack>
      </Stack>

      <Typography variant="body1" sx={{ color: 'text.secondary', flex: 1 }}>
        {t(vacancy.descriptionKey)}
      </Typography>

      <Box>
        <Button
          component={NextLink}
          href={`/vacancies/${vacancy.slug}`}
          variant="contained"
          color="primary"
          endIcon={<SvgIcon name="tabler-arrow-right" size={16} stroke={2} />}
        >
          {t('vacancies.viewVacancy')}
        </Button>
      </Box>
    </Card>
  );
}

/***************************  VACANCIES - LIST  ***************************/

export default function VacancyList1({ headingKey, captionKey, vacancies, types }) {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState('all');

  // Only offer a filter for types that actually have an open vacancy
  const availableTypes = useMemo(
    () => types.filter((type) => type.value === 'all' || vacancies.some((vacancy) => vacancy.type === type.value)),
    [types, vacancies]
  );

  const visibleVacancies = useMemo(
    () => (selectedType === 'all' ? vacancies : vacancies.filter((vacancy) => vacancy.type === selectedType)),
    [vacancies, selectedType]
  );

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <MotionWrapper>
          <Typeset
            heading={t(headingKey)}
            caption={t(captionKey)}
            stackProps={{ sx: { textAlign: 'center', maxWidth: 600, mx: 'auto' } }}
            headingProps={{ variant: 'h3', component: 'h2' }}
            captionProps={{ variant: 'body1' }}
          />
        </MotionWrapper>

        {availableTypes.length > 2 && (
          <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('vacancies.filterByType')}
            </Typography>
            {availableTypes.map((type) => (
              <Chip
                key={type.value}
                label={t(type.labelKey)}
                onClick={() => setSelectedType(type.value)}
                color={selectedType === type.value ? 'primary' : 'default'}
                variant={selectedType === type.value ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        )}

        {visibleVacancies.length > 0 ? (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {visibleVacancies.map((vacancy) => (
              <Grid key={vacancy.slug} size={{ xs: 12, md: 6 }}>
                <VacancyCard vacancy={vacancy} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {t('vacancies.noVacancies')}
          </Typography>
        )}
      </Stack>
    </ContainerWrapper>
  );
}

VacancyCard.propTypes = { vacancy: PropTypes.object.isRequired };

VacancyList1.propTypes = {
  headingKey: PropTypes.string.isRequired,
  captionKey: PropTypes.string.isRequired,
  vacancies: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired
};

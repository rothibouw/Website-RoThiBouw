'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';
import VacancyCard from '@/components/cards/VacancyCard';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  VACANCIES - 1 (WITH TYPE FILTER)  ***************************/

export default function Vacancies1({ headingKey, captionKey, vacancies, types }) {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState('all');

  const activeVacancies = vacancies.filter((v) => v.isActive);

  const filteredVacancies = selectedType === 'all' ? activeVacancies : activeVacancies.filter((v) => v.type === selectedType);

  // Only render filter when there are 2+ distinct non-all types with active vacancies
  const availableTypes = types.filter((type) => {
    if (type.id === 'all') return true;
    return activeVacancies.some((v) => v.type === type.id);
  });
  const showFilter = availableTypes.length > 2;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack spacing={5}>
        <MotionWrapper>
          <Typeset
            {...{
              heading: t(headingKey),
              caption: t(captionKey),
              stackProps: { sx: { gap: 1.5, textAlign: 'center', maxWidth: 600, mx: 'auto' } },
              headingProps: { variant: 'h2', component: 'h1' },
              captionProps: { variant: 'body1' }
            }}
          />
        </MotionWrapper>

        {showFilter && (
          <MotionWrapper delay={0.2}>
            <Stack spacing={2}>
              <Typography variant="h6" component="h2">
                {t('vacancies.filterByType')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {availableTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? 'contained' : 'outlined'}
                    onClick={() => setSelectedType(type.id)}
                    sx={{ borderRadius: 8, textTransform: 'none', fontWeight: 500, px: 3 }}
                  >
                    {t(type.labelKey)}
                  </Button>
                ))}
              </Box>
            </Stack>
          </MotionWrapper>
        )}

        {filteredVacancies.length > 0 ? (
          <Grid container spacing={3}>
            {filteredVacancies.map((vacancy, index) => (
              <Grid key={vacancy.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <VacancyCard vacancy={vacancy} index={index} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <MotionWrapper>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                {t('vacancies.noVacancies')}
              </Typography>
            </Box>
          </MotionWrapper>
        )}
      </Stack>
    </ContainerWrapper>
  );
}

Vacancies1.propTypes = {
  headingKey: PropTypes.string.isRequired,
  captionKey: PropTypes.string.isRequired,
  vacancies: PropTypes.array.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      labelKey: PropTypes.string.isRequired
    })
  ).isRequired
};

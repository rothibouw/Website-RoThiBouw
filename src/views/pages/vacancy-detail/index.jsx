'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @data
import { createVacancyDetailSections } from './data';

/***************************  VACANCY DETAIL PAGE  ***************************/

export default function VacancyDetailPage({ vacancy }) {
  useDataThemeMode();
  const { t } = useTranslation();

  if (!vacancy) {
    return (
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Typography variant="h4">{t('vacancies.vacancyNotFound')}</Typography>
      </ContainerWrapper>
    );
  }

  const sections = createVacancyDetailSections(vacancy);

  return (
    <Stack spacing={0}>
      <LazySection sections={sections} offset="200px" />
    </Stack>
  );
}

VacancyDetailPage.propTypes = {
  vacancy: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    titleKey: PropTypes.string.isRequired,
    introKey: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    hoursKey: PropTypes.string.isRequired,
    contractKey: PropTypes.string.isRequired,
    tasksKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    requirementsKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    offerKeys: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

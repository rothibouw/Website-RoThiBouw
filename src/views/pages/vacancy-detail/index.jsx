'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { VacancyDetail1 } from '@/blocks/vacancies';
import ContainerWrapper from '@/components/ContainerWrapper';
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';
import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

// @data
import { activeVacancies } from '@/data/vacancies';

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

  return (
    <Stack spacing={0}>
      {/* Carries the page h1 — rendered eagerly so it is server-rendered */}
      <VacancyDetail1 vacancy={vacancy} applyHref="#apply" />
      <LazySection
        sections={{
          importFunc: () => import('@/blocks/vacancies').then((module) => ({ default: module.ApplySection1 })),
          props: { vacancies: activeVacancies, defaultPosition: vacancy.slug }
        }}
        offset="200px"
      />
    </Stack>
  );
}

VacancyDetailPage.propTypes = {
  vacancy: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    titleKey: PropTypes.string.isRequired
  })
};

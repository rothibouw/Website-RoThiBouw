'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { HeroSlideshow } from '@/blocks/hero';
import LazySection from '@/components/LazySection';
import ContainerWrapper from '@/components/ContainerWrapper';
import useDataThemeMode from '@/hooks/useDataThemeMode';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

// @sections
import { createServiceDetailSections } from './data';

/***************************  SERVICE DETAIL PAGE  ***************************/

export default function ServiceDetailPage({ service }) {
  useDataThemeMode();
  const { t } = useTranslation();

  if (!service) {
    return (
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Typography variant="h4">{t('services.serviceNotFound')}</Typography>
      </ContainerWrapper>
    );
  }

  const sections = createServiceDetailSections(service);

  return (
    <Stack spacing={0}>
      {/* The hero carries the page h1, so it is rendered eagerly rather than lazily */}
      <HeroSlideshow
        slides={[{ image: service.heroImage, title: service.titleKey }]}
        height={{ xs: 300, sm: 400, md: 500 }}
        showText
        headingComponent="h1"
      />
      <LazySection sections={sections} offset="200px" />
    </Stack>
  );
}

ServiceDetailPage.propTypes = {
  service: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    titleKey: PropTypes.string.isRequired,
    heroImage: PropTypes.string.isRequired,
    descriptionTitleKey: PropTypes.string.isRequired,
    descriptionKey: PropTypes.string.isRequired,
    descriptionImage: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    featureImage: PropTypes.string.isRequired,
    relatedCategories: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

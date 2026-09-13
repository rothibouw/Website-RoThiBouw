'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { ProjectHeader } from '@/blocks/project';
import LazySection from '@/components/LazySection';
import ContainerWrapper from '@/components/ContainerWrapper';
import useDataThemeMode from '@/hooks/useDataThemeMode';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @data
import { createProjectDetailSections } from './data';

/***************************  PROJECT DETAIL PAGE  ***************************/

export default function ProjectDetailPage({ project }) {
  useDataThemeMode();
  const { t } = useTranslation();

  if (!project) {
    return (
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Typography variant="h4">{t('projects.projectNotFound')}</Typography>
      </ContainerWrapper>
    );
  }

  const sections = createProjectDetailSections(project);

  return (
    <Stack spacing={0}>
      {/* The header carries the page h1, so it is rendered eagerly rather than lazily */}
      <ProjectHeader titleKey={project.titleKey} subtitleKey={project.subtitleKey} />
      <LazySection sections={sections} offset="200px" />
    </Stack>
  );
}

ProjectDetailPage.propTypes = {
  project: PropTypes.shape({
    titleKey: PropTypes.string.isRequired,
    subtitleKey: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    projectInformationDescriptionKey: PropTypes.string,
    descriptionKey: PropTypes.string,
    transformationImages: PropTypes.shape({
      before: PropTypes.string.isRequired,
      after: PropTypes.string.isRequired
    }),
    transformationDescriptionKey: PropTypes.string,
    primaryInfo: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string,
        labelKey: PropTypes.string,
        value: PropTypes.string,
        valueKey: PropTypes.string
      })
    ),
    specifications: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string,
        labelKey: PropTypes.string,
        value: PropTypes.string,
        valueKey: PropTypes.string
      })
    ),
    secondaryInfo: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string,
          label: PropTypes.string,
          labelKey: PropTypes.string,
          value: PropTypes.string,
          valueKey: PropTypes.string
        })
      ),
      PropTypes.string
    ]),
    testimonial: PropTypes.shape({
      name: PropTypes.string,
      review: PropTypes.string,
      reviewKey: PropTypes.string,
      rating: PropTypes.number
    })
  })
};

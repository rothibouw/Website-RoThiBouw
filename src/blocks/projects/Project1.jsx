'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import ProjectCard from '@/components/cards/ProjectCard';
import Typeset from '@/components/Typeset';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROJECTS - 1 (FEATURED)  ***************************/

export default function Project1({ heading, caption, projects, showViewAll = true, viewAllBtnKey = 'home.viewAllProjects' }) {
  const { t } = useTranslation();

  // Filter for highlighted projects only
  const highlightedProjects = projects.filter((project) => project.isHighlighted);

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack spacing={5}>
        {/* Section Header */}
        <MotionWrapper>
          <Typeset
            {...{
              heading: t(heading),
              caption: t(caption),
              stackProps: { sx: { gap: 1.5, textAlign: 'center', maxWidth: 600, mx: 'auto' } },
              headingProps: { variant: 'h2' },
              captionProps: { variant: 'body1' }
            }}
          />
        </MotionWrapper>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {highlightedProjects.map((project, index) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 6 }}>
              <ProjectCard project={project} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* View All Button */}
        {showViewAll && (
          <MotionWrapper delay={0.3}>
            <Stack direction="row" justifyContent="center">
              <ButtonAnimationWrapper>
                <Button component={NextLink} href="/projects" variant="outlined" size="large" sx={{ px: 4 }}>
                  {t(viewAllBtnKey)}
                </Button>
              </ButtonAnimationWrapper>
            </Stack>
          </MotionWrapper>
        )}
      </Stack>
    </ContainerWrapper>
  );
}

Project1.propTypes = {
  heading: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  showViewAll: PropTypes.bool,
  viewAllBtnKey: PropTypes.string
};

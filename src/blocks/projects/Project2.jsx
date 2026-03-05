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
import ProjectCard from '@/components/cards/ProjectCard';
import Typeset from '@/components/Typeset';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROJECTS - 2 (WITH CATEGORY FILTER)  ***************************/

export default function Project2({ heading, caption, projects, categories }) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter logic: max 6 projects, with at least one from each category when viewing all
  const getFilteredProjects = () => {
    if (selectedCategory === 'all') {
      // Get unique categories from projects
      const uniqueCategories = [...new Set(projects.flatMap((p) => p.categories))];
      const result = [];

      // First pass: get one from each category
      for (const cat of uniqueCategories) {
        const project = projects.find((p) => p.categories.includes(cat));
        if (project && !result.includes(project)) {
          result.push(project);
        }
      }

      // Second pass: add more projects until we reach 6
      for (const project of projects) {
        if (result.length >= 6) break;
        if (!result.includes(project)) {
          result.push(project);
        }
      }

      return result;
    } else {
      // Filter by category and limit to max 6
      return projects.filter((p) => p.categories.includes(selectedCategory)).slice(0, 6);
    }
  };

  const filteredProjects = getFilteredProjects();

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
              headingProps: { variant: 'h2', component: 'h1' },
              captionProps: { variant: 'body1' }
            }}
          />
        </MotionWrapper>

        {/* Category Filter */}
        <MotionWrapper delay={0.2}>
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              {t('projects.filterByCategory')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                  onClick={() => setSelectedCategory(category.id)}
                  sx={{ borderRadius: 8, textTransform: 'none', fontWeight: 500, px: 3 }}
                >
                  {t(category.labelKey)}
                </Button>
              ))}
            </Box>
          </Stack>
        </MotionWrapper>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {filteredProjects.map((project, index) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard project={project} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <MotionWrapper>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                {t('projects.noProjects')}
              </Typography>
            </Box>
          </MotionWrapper>
        )}
      </Stack>
    </ContainerWrapper>
  );
}

Project2.propTypes = {
  heading: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      labelKey: PropTypes.string.isRequired
    })
  ).isRequired
};

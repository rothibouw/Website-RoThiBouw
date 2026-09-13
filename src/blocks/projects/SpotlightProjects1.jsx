'use client';
import PropTypes from 'prop-types';

// @next
import Image from 'next/image';
import NextLink from 'next/link';

// @mui
import Box from '@mui/material/Box';
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

/***************************  SPOTLIGHT CARD  ***************************/

function SpotlightCard({ project, sx = {} }) {
  const { t } = useTranslation();
  const { slug, titleKey, thumbnail, categories, location, year } = project;
  const category = categories?.[0];
  const locationYear = [location, year].filter(Boolean).join(' · ');

  return (
    <Box
      component={NextLink}
      href={`/projects/${slug}`}
      sx={{
        position: 'relative',
        display: 'block',
        borderRadius: BORDER_RADIUS.xs,
        overflow: 'hidden',
        textDecoration: 'none',
        bgcolor: 'grey.800',
        '&:hover .spotlight-card-img': { transform: 'scale(1.04)' },
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        },
        ...sx
      }}
    >
      {/* Image */}
      <Box className="spotlight-card-img" sx={{ position: 'absolute', inset: 0, transition: 'transform 0.4s ease' }}>
        <Image src={thumbnail} alt={t(titleKey)} fill style={{ objectFit: 'cover' }} />
      </Box>

      {/* Badge */}
      {category && (
        <Box sx={{ position: 'absolute', top: 16, left: 20, zIndex: 2 }}>
          <Chip
            label={t(`projects.categories.${category}`)}
            size="small"
            sx={{
              bgcolor: 'rgba(0,0,0,0.22)',
              color: 'white',
              backdropFilter: 'blur(6px)',
              borderRadius: '100px',
              fontWeight: 400,
              fontSize: '0.75rem',
              letterSpacing: 'normal',
              textTransform: 'none',
              border: '1px solid rgba(255,255,255,0.18)',
              height: 26,
              '& .MuiChip-label': { px: 1.5, py: 0 }
            }}
          />
        </Box>
      )}

      {/* Bottom text: title then location/year */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, px: 3, pb: 3, zIndex: 2 }}>
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            lineHeight: 1.3,
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {t(titleKey)}
        </Typography>
        {locationYear && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'white' }}>
            <SvgIcon name="tabler-map-pin" size={13} color="common.white" />
            <Typography variant="caption" sx={{ color: 'inherit', lineHeight: 1.3 }}>
              {locationYear}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

/***************************  PROJECTS - SPOTLIGHT 1  ***************************/

export default function SpotlightProjects1({ headingKey, captionKey, projects }) {
  const { t } = useTranslation();
  const [p1, p2, p3, p4, p5] = projects;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack spacing={{ xs: 3, sm: 4 }}>
        <MotionWrapper>
          <Typeset
            heading={t(headingKey)}
            caption={t(captionKey)}
            stackProps={{ sx: { textAlign: 'center', alignItems: 'center' } }}
            headingProps={{ variant: 'h2' }}
          />
        </MotionWrapper>

        <Grid container spacing={1.5}>
          {/* Large hero card — left column */}
          {p1 && (
            <Grid size={{ xs: 12, md: 7 }}>
              <MotionWrapper variant="slideInFromBottom" delay={0.1}>
                <SpotlightCard project={p1} sx={{ height: { xs: 280, sm: 360, md: 480 } }} />
              </MotionWrapper>
            </Grid>
          )}

          {/* Two stacked cards — right column. Heights sum to match the hero card:
              desktop gap = spacing 1.5 = 12px → each card = (480 - 12) / 2 = 234px */}
          {(p2 || p3) && (
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={1.5}>
                {p2 && (
                  <MotionWrapper variant="slideInFromBottom" delay={0.2}>
                    <SpotlightCard project={p2} sx={{ height: { xs: 220, sm: 280, md: 234 } }} />
                  </MotionWrapper>
                )}
                {p3 && (
                  <MotionWrapper variant="slideInFromBottom" delay={0.3}>
                    <SpotlightCard project={p3} sx={{ height: { xs: 220, sm: 280, md: 234 } }} />
                  </MotionWrapper>
                )}
              </Stack>
            </Grid>
          )}

          {/* Bottom row — two equal cards */}
          {p4 && (
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionWrapper variant="slideInFromBottom" delay={0.15}>
                <SpotlightCard project={p4} sx={{ height: { xs: 220, sm: 280, md: 300 } }} />
              </MotionWrapper>
            </Grid>
          )}
          {p5 && (
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionWrapper variant="slideInFromBottom" delay={0.25}>
                <SpotlightCard project={p5} sx={{ height: { xs: 220, sm: 280, md: 300 } }} />
              </MotionWrapper>
            </Grid>
          )}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

SpotlightCard.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    titleKey: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    year: PropTypes.number
  }).isRequired,
  sx: PropTypes.object
};

SpotlightProjects1.propTypes = {
  headingKey: PropTypes.string.isRequired,
  captionKey: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired
};

'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';

// @next
import NextLink from 'next/link';
import Image from 'next/image';

// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// @project
import SvgIcon from '@/components/SvgIcon';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';
import { GraphicsCard } from '@/components/cards';

import useTranslation from '@/hooks/useTranslation';

/***************************  PROJECT CARD  ***************************/

export default function ProjectCard({ project, index = 0 }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = project.images || [project.thumbnail];
  const currentImage = images[currentImageIndex];
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <MotionWrapper delay={0.2 + index * 0.1}>
      <GraphicsCard sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Project Image with Navigation */}
        <Box sx={{ position: 'relative', width: '100%', height: 380, overflow: 'hidden', bgcolor: 'grey.200' }}>
          <Image src={currentImage} alt={t(project.titleKey)} fill style={{ objectFit: 'cover' }} priority={index === 0} />

          {/* Navigation Arrows & Dots (only if multiple images) */}
          {hasMultipleImages && (
            <>
              {/* Previous Image Button */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1
                }}
              >
                <Fab color="primary" size="small" onClick={handlePrevImage} aria-label="previous image" sx={{ width: 40, height: 40 }}>
                  <SvgIcon name="tabler-chevron-left" color="background.default" size={20} />
                </Fab>
              </Box>

              {/* Next Image Button */}
              <Box
                sx={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1
                }}
              >
                <Fab color="primary" size="small" onClick={handleNextImage} aria-label="next image" sx={{ width: 40, height: 40 }}>
                  <SvgIcon name="tabler-chevron-right" color="background.default" size={20} />
                </Fab>
              </Box>

              {/* Dot Navigation */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1,
                  zIndex: 2
                }}
              >
                {images.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: currentImageIndex === idx ? 'white' : alpha('#fff', 0.5),
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'white'
                      }
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>

        {/* Card Content */}
        <Stack sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, gap: { xs: 1, md: 2 } }}>
          {/* Title & Description */}
          <Typeset
            {...{
              heading: t(project.titleKey),
              caption: project.subtitleKey ? t(project.subtitleKey) : undefined,
              stackProps: { sx: { gap: { xs: 1, md: 1.5 } } },
              headingProps: { variant: 'h4' },
              captionProps: {
                variant: 'body1',
                sx: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }
              }
            }}
          />

          {/* Metadata */}
          <Stack direction="row" spacing={2} sx={{ mt: 'auto', pt: { xs: 1, md: 2 }, alignItems: 'center' }}>
            {project.location && (
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flex: 1 }}>
                <SvgIcon name="tabler-map-pin" size={16} color="text.secondary" />
                <Box component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                  {project.location}
                </Box>
              </Stack>
            )}
            {!project.location && <Box sx={{ flex: 1 }} />}
            {project.year && (
              <Box component="span" sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary' }}>
                {project.year}
              </Box>
            )}
          </Stack>

          {/* Navigation Button */}
          <Button component={NextLink} href={`/projecten/${project.slug}`} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {t('common.readMore')}
          </Button>
        </Stack>
      </GraphicsCard>
    </MotionWrapper>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    titleKey: PropTypes.string.isRequired,
    subtitleKey: PropTypes.string,
    category: PropTypes.string.isRequired,
    year: PropTypes.number,
    location: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  index: PropTypes.number
};

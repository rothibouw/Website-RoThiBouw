'use client';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// @next
import Image from 'next/image';

// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import SvgIcon from '@/components/SvgIcon';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY, BORDER_RADIUS } from '@/utils/constant';

const SLIDE_INTERVAL_MS = 4000;

/***************************  SERVICE IMAGE SLIDESHOW  ***************************/

function ServiceImageSlideshow({ images, alt }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 280, sm: 360, md: 480 },
        borderRadius: BORDER_RADIUS.xs,
        overflow: 'hidden'
      }}
    >
      {images.map((src, index) => (
        <Box
          key={src}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: index === activeIndex ? 1 : 0,
            transition: 'opacity 0.9s ease'
          }}
        >
          <Image src={src} alt={index === 0 ? alt : ''} fill style={{ objectFit: 'cover' }} />
        </Box>
      ))}
    </Box>
  );
}

/***************************  SERVICE - OVERVIEW 1  ***************************/

export default function ServiceOverview1({ titleKey, descriptionKey, images, featureKeys }) {
  const { t } = useTranslation();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <MotionWrapper variant="slideInFromSide" direction="left">
            <ServiceImageSlideshow images={images} alt={t(titleKey)} />
          </MotionWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <MotionWrapper variant="slideInFromSide" direction="right" delay={0.2}>
            <Stack spacing={3}>
              <Stack spacing={1.5}>
                <Typography variant="h3">{t(titleKey)}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {t(descriptionKey)}
                </Typography>
              </Stack>
              <List disablePadding>
                {featureKeys.map((featureKey, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.75, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 44, pt: 0.25 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        <SvgIcon name="tabler-check" size={16} color="common.white" stroke={2.5} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText disableTypography>
                      <Typography variant="body1">{t(featureKey)}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </MotionWrapper>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

ServiceImageSlideshow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt: PropTypes.string.isRequired
};

ServiceOverview1.propTypes = {
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  featureKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};

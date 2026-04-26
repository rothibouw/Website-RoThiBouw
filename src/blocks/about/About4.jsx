'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import GraphicsImage from '@/components/GraphicsImage';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY, BORDER_RADIUS } from '@/utils/constant';

/***************************  ABOUT - 4  ***************************/

export default function About4({ headingKey, highlightKey, captionKey, image, primaryBtn }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const highlightColor = theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.main;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MotionWrapper>
            <GraphicsImage
              image={image}
              sx={{
                height: { xs: 300, sm: 400, md: 480 },
                borderRadius: BORDER_RADIUS.xs,
                overflow: 'hidden'
              }}
            />
          </MotionWrapper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MotionWrapper delay={0.3}>
            <Stack spacing={3}>
              <Typography variant="h2">
                {t(headingKey)}{' '}
                <Box component="span" sx={{ color: highlightColor }}>
                  {t(highlightKey)}
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {t(captionKey)}
              </Typography>
              <Box>
                <ButtonAnimationWrapper>
                  <Button component={NextLink} href={primaryBtn.href} variant="contained" size="large" sx={{ px: 4 }}>
                    {t(primaryBtn.children)}
                  </Button>
                </ButtonAnimationWrapper>
              </Box>
            </Stack>
          </MotionWrapper>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

About4.propTypes = {
  labelKey: PropTypes.string,
  headingKey: PropTypes.string,
  highlightKey: PropTypes.string,
  captionKey: PropTypes.string,
  image: PropTypes.string,
  primaryBtn: PropTypes.shape({
    href: PropTypes.string,
    children: PropTypes.string
  })
};

'use client';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY, BORDER_RADIUS } from '@/utils/constant';

/***************************  PROJECT - TRANSFORMATION COMPARISON  ***************************/

export default function TransformationComparison({ headingKey, captionKey, beforeImage, afterImage, descriptionKey }) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack spacing={{ xs: 4, sm: 5 }}>
        {/* Header */}
        <MotionWrapper>
          <Typeset
            heading={t(headingKey)}
            caption={captionKey ? t(captionKey) : undefined}
            stackProps={{ sx: { textAlign: 'center', alignItems: 'center' } }}
          />
        </MotionWrapper>

        {/* Before/After Images */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Before Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionWrapper variant="slideInFromSide" direction="left" delay={0.1}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 1,
                    paddingTop: '75%', // 4:3 aspect ratio
                    borderRadius: BORDER_RADIUS.xs,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    component="img"
                    src={beforeImage}
                    alt={t('projects.transformation.before')}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 1,
                      height: 1,
                      objectFit: 'cover'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 1,
                      backgroundColor: alpha(theme.palette.primary.main, 0.95),
                      px: 2,
                      py: 1,
                      borderRadius: BORDER_RADIUS.xs
                    }}
                  >
                    <Typography variant="h6" color="primary.contrastText">
                      {t('projects.transformation.before')}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </MotionWrapper>
          </Grid>

          {/* After Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionWrapper variant="slideInFromSide" direction="right" delay={0.2}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 1,
                    paddingTop: '75%', // 4:3 aspect ratio
                    borderRadius: BORDER_RADIUS.xs,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    component="img"
                    src={afterImage}
                    alt={t('projects.transformation.after')}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 1,
                      height: 1,
                      objectFit: 'cover'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 1,
                      backgroundColor: alpha(theme.palette.primary.main, 0.95),
                      px: 2,
                      py: 1,
                      borderRadius: BORDER_RADIUS.xs
                    }}
                  >
                    <Typography variant="h6" color="primary.contrastText">
                      {t('projects.transformation.after')}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </MotionWrapper>
          </Grid>
        </Grid>

        {/* Optional Description */}
        {descriptionKey && (
          <MotionWrapper variant="fadeIn" delay={0.3}>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}>
              {t(descriptionKey)}
            </Typography>
          </MotionWrapper>
        )}
      </Stack>
    </ContainerWrapper>
  );
}

TransformationComparison.propTypes = {
  headingKey: PropTypes.string.isRequired,
  captionKey: PropTypes.string,
  beforeImage: PropTypes.string.isRequired,
  afterImage: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string
};

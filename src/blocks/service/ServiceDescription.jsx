'use client';
import PropTypes from 'prop-types';

// @next
import Image from 'next/image';

// @mui
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  SERVICE - DESCRIPTION  ***************************/

export default function ServiceDescription({ titleKey, descriptionKey, image, reverse = false }) {
  const { t } = useTranslation();

  const displayTitle = t(titleKey);
  const displayDescription = t(descriptionKey);

  const textContent = (
    <MotionWrapper variant="slideInFromSide" direction={reverse ? 'right' : 'left'}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 1, gap: 2 }}>
        <Typography variant="h3">{displayTitle}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {displayDescription}
        </Typography>
      </Box>
    </MotionWrapper>
  );

  const imageContent = (
    <MotionWrapper variant="slideInFromSide" direction={reverse ? 'left' : 'right'} delay={0.2}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 300, sm: 350, md: 400 },
          borderRadius: { xs: 6, sm: 8, md: 10 },
          overflow: 'hidden'
        }}
      >
        <Image src={image} alt={displayTitle} fill style={{ objectFit: 'cover' }} />
      </Box>
    </MotionWrapper>
  );

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 3, sm: 4, md: 5 }} alignItems="center">
        <Grid size={{ xs: 12, md: 7 }}>{reverse ? imageContent : textContent}</Grid>
        <Grid size={{ xs: 12, md: 5 }}>{reverse ? textContent : imageContent}</Grid>
      </Grid>
    </ContainerWrapper>
  );
}

ServiceDescription.propTypes = {
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  reverse: PropTypes.bool
};

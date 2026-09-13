'use client';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  STORY ITEM  ***************************/

function StoryItem({ number, titleKey, bodyKey }) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={{ xs: 2, md: 4 }} sx={{ alignItems: 'flex-start' }}>
      <Grid size={{ xs: 2 }}>
        <Typography variant="h2" sx={{ color: 'text.disabled', fontWeight: 300, lineHeight: 1.1, userSelect: 'none' }}>
          {String(number).padStart(2, '0')}
        </Typography>
      </Grid>
      <Grid size={{ xs: 10 }}>
        <Stack spacing={1.5} sx={{ pt: 0.5 }}>
          <Typography variant="h5">{t(titleKey)}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {t(bodyKey)}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

/***************************  INLINE QUOTE  ***************************/

function InlineQuote({ textKey, attributionKey }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ pl: 3, borderLeft: '4px solid', borderColor: 'primary.main', py: 1 }}>
      <Typography sx={{ color: 'primary.main', fontSize: '2.5rem', lineHeight: 1, mb: 1.5, fontFamily: 'Georgia, serif' }}>
        &ldquo;
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 400, lineHeight: 1.5, mb: 2 }}>
        {t(textKey)}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        — {t(attributionKey)}
      </Typography>
    </Box>
  );
}

/***************************  PROJECT STORY 1  ***************************/

export default function ProjectStory1({ items }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack spacing={{ xs: 4, md: 6 }} sx={{ maxWidth: 800, mx: 'auto' }}>
        {items.map((item, index) => (
          <MotionWrapper key={index} variant="fadeIn" delay={index * 0.1}>
            <Stack spacing={{ xs: 3, md: 4 }}>
              <StoryItem number={index + 1} titleKey={item.titleKey} bodyKey={item.bodyKey} />
              {item.quote && <InlineQuote textKey={item.quote.textKey} attributionKey={item.quote.attributionKey} />}
            </Stack>
          </MotionWrapper>
        ))}
      </Stack>
    </ContainerWrapper>
  );
}

StoryItem.propTypes = {
  number: PropTypes.number.isRequired,
  titleKey: PropTypes.string.isRequired,
  bodyKey: PropTypes.string.isRequired
};

InlineQuote.propTypes = {
  textKey: PropTypes.string.isRequired,
  attributionKey: PropTypes.string.isRequired
};

ProjectStory1.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      titleKey: PropTypes.string.isRequired,
      bodyKey: PropTypes.string.isRequired,
      quote: PropTypes.shape({
        textKey: PropTypes.string.isRequired,
        attributionKey: PropTypes.string.isRequired
      })
    })
  ).isRequired
};

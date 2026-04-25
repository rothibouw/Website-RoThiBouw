'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import MotionWrapper from '@/components/MotionWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import useTranslation from '@/hooks/useTranslation';

/***************************  VACANCY CARD  ***************************/

export default function VacancyCard({ vacancy, index = 0 }) {
  const { t } = useTranslation();

  return (
    <MotionWrapper delay={0.2 + index * 0.1}>
      <GraphicsCard sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, gap: { xs: 2, md: 3 } }}>
          <Box>
            <Chip label={t(`vacancies.types.${vacancy.type}`)} size="small" color="primary" sx={{ fontWeight: 600, borderRadius: 2 }} />
          </Box>

          <Typeset
            {...{
              heading: t(vacancy.titleKey),
              caption: t(vacancy.descriptionKey),
              stackProps: { sx: { gap: { xs: 1, md: 1.5 } } },
              headingProps: { variant: 'h4' },
              captionProps: {
                variant: 'body1',
                sx: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }
              }
            }}
          />

          <Stack spacing={1.5} sx={{ mt: 'auto' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <SvgIcon name="tabler-map-pin" size={16} color="text.secondary" />
              <Typography variant="body2" color="text.secondary">
                {vacancy.location}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <SvgIcon name="tabler-clock" size={16} color="text.secondary" />
              <Typography variant="body2" color="text.secondary">
                {t(vacancy.hoursKey)}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <SvgIcon name="tabler-file-text" size={16} color="text.secondary" />
              <Typography variant="body2" color="text.secondary">
                {t(vacancy.contractKey)}
              </Typography>
            </Stack>
          </Stack>

          <Button component={NextLink} href={`/vacancies/${vacancy.slug}`} variant="contained" color="primary" fullWidth>
            {t('vacancies.viewVacancy')}
          </Button>
        </Stack>
      </GraphicsCard>
    </MotionWrapper>
  );
}

VacancyCard.propTypes = {
  vacancy: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    titleKey: PropTypes.string.isRequired,
    descriptionKey: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    hoursKey: PropTypes.string.isRequired,
    contractKey: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number
};

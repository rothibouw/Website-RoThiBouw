'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
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

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  VACANCY - BULLET LIST  ***************************/

function BulletList({ headingKey, itemKeys, icon }) {
  const { t } = useTranslation();

  return (
    <Stack sx={{ gap: 1 }}>
      <Typography variant="h4" component="h2">
        {t(headingKey)}
      </Typography>
      <List disablePadding>
        {itemKeys.map((itemKey) => (
          <ListItem key={itemKey} disableGutters sx={{ alignItems: 'flex-start', py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
              <SvgIcon name={icon} size={18} color="primary.main" />
            </ListItemIcon>
            <ListItemText primary={t(itemKey)} primaryTypographyProps={{ variant: 'body1' }} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

/***************************  VACANCY - DETAIL  ***************************/

export default function VacancyDetail1({ vacancy, applyHref }) {
  const { t } = useTranslation();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <MotionWrapper>
            <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
              <Stack sx={{ gap: 1.5 }}>
                <Box>
                  <Button
                    component={NextLink}
                    href="/vacancies"
                    size="small"
                    color="inherit"
                    startIcon={<SvgIcon name="tabler-arrow-left" size={16} stroke={2} />}
                    sx={{ color: 'text.secondary', px: 0 }}
                  >
                    {t('vacancies.detail.backToVacancies')}
                  </Button>
                </Box>
                <Typography variant="h2" component="h1">
                  {t(vacancy.titleKey)}
                </Typography>
                <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
                  <Chip size="small" icon={<SvgIcon name="tabler-clock" size={14} />} label={t(vacancy.hoursKey)} />
                  <Chip size="small" icon={<SvgIcon name="tabler-file-text" size={14} />} label={t(vacancy.contractKey)} />
                </Stack>
              </Stack>

              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {t(vacancy.introKey)}
              </Typography>

              <BulletList headingKey="vacancies.detail.tasksHeading" itemKeys={vacancy.taskKeys} icon="tabler-point" />
              <BulletList headingKey="vacancies.detail.requirementsHeading" itemKeys={vacancy.requirementKeys} icon="tabler-check" />
              <BulletList headingKey="vacancies.detail.offerHeading" itemKeys={vacancy.offerKeys} icon="tabler-star" />
            </Stack>
          </MotionWrapper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
            <Button component={NextLink} href={applyHref} variant="contained" color="primary" size="large" fullWidth>
              {t('vacancies.detail.applyNow')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

BulletList.propTypes = {
  headingKey: PropTypes.string.isRequired,
  itemKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  icon: PropTypes.string.isRequired
};

VacancyDetail1.propTypes = {
  vacancy: PropTypes.object.isRequired,
  applyHref: PropTypes.string.isRequired
};

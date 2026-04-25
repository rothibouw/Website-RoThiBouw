'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import SvgIcon from '@/components/SvgIcon';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  VACANCY DETAIL - CARD  ***************************/

function DetailCard({ icon, headingKey, itemKeys, delay }) {
  const { t } = useTranslation();

  return (
    <MotionWrapper delay={delay}>
      <GraphicsCard sx={{ height: 1, p: { xs: 2.5, sm: 3, md: 4 } }}>
        <Stack sx={{ gap: 3, height: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 48, height: 48, bgcolor: 'grey.300' }}>
              <SvgIcon name={icon} size={22} color="text.primary" />
            </Avatar>
            <Typography variant="h4">{t(headingKey)}</Typography>
          </Stack>
          <List disablePadding>
            {itemKeys.map((key, index) => (
              <ListItem key={index} disablePadding sx={{ py: 0.75, alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 32, mt: 0.25 }}>
                  <SvgIcon name="tabler-check" size={18} color="primary.main" stroke={2.5} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1">{t(key)}</Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Stack>
      </GraphicsCard>
    </MotionWrapper>
  );
}

/***************************  VACANCY DETAIL - 1  ***************************/

export default function VacancyDetail1({ tasksKeys, requirementsKeys, offerKeys }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DetailCard icon="tabler-tools" headingKey="vacancies.detail.tasksHeading" itemKeys={tasksKeys} delay={0.1} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DetailCard icon="tabler-user-check" headingKey="vacancies.detail.requirementsHeading" itemKeys={requirementsKeys} delay={0.2} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DetailCard icon="tabler-gift" headingKey="vacancies.detail.offerHeading" itemKeys={offerKeys} delay={0.3} />
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

DetailCard.propTypes = {
  icon: PropTypes.string.isRequired,
  headingKey: PropTypes.string.isRequired,
  itemKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  delay: PropTypes.number
};

VacancyDetail1.propTypes = {
  tasksKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  requirementsKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  offerKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};

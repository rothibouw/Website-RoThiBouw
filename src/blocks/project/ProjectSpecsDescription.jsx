'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROJECT SPECS & DESCRIPTION  ***************************/

export default function ProjectSpecsDescription({ specifications, descriptionKey, specsTitleKey }) {
  const { t } = useTranslation();

  const descriptionText = descriptionKey ? t(descriptionKey) : '';
  const specsTitleText = specsTitleKey ? t(specsTitleKey) : '';

  // Specifications list layout
  const specsContent = (
    <Grid size={{ xs: 12, sm: 6, md: 5 }}>
      <GraphicsCard>
        <Box sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
          <Stack spacing={{ xs: 2, sm: 3 }}>
            {specsTitleText && (
              <Typography variant="h4" component="h3" sx={{ textAlign: 'center' }}>
                {specsTitleText}
              </Typography>
            )}
            <List disablePadding>
              {specifications.map((item, index) => (
                <ListItem
                  disablePadding
                  key={index}
                  sx={{
                    pb: index < specifications.length - 1 ? { xs: 2, sm: 2.5, md: 3 } : 0,
                    pt: index > 0 ? { xs: 2, sm: 2.5, md: 3 } : 0,
                    alignItems: 'flex-start'
                  }}
                >
                  {item.icon && (
                    <ListItemAvatar sx={{ minWidth: { xs: 52, sm: 60, md: 76 }, height: 60 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'grey.300',
                          width: { xs: 40, sm: 48, md: 60 },
                          height: { xs: 40, sm: 48, md: 60 },
                          '& svg': { width: { xs: 16, sm: 20, md: 24 }, height: { xs: 16, sm: 20, md: 24 } }
                        }}
                      >
                        <SvgIcon name={item.icon} color="text.primary" />
                      </Avatar>
                    </ListItemAvatar>
                  )}
                  <ListItemText sx={{ my: 0 }}>
                    <Stack sx={{ gap: { xs: 0.5, sm: 1 } }}>
                      <Typography variant="h6" sx={{ fontWeight: 400 }}>
                        {item.labelKey ? t(item.labelKey) : item.label}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {item.valueKey ? t(item.valueKey) : item.value}
                      </Typography>
                    </Stack>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Box>
      </GraphicsCard>
    </Grid>
  );

  // Description content
  const descriptionContent = descriptionText && (
    <Grid size={{ xs: 12, sm: 6, md: 7 }}>
      <Box
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.main',
            lineHeight: 1.8,
            fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.0625rem' }
          }}
        >
          {descriptionText}
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid
        container
        spacing={{ xs: 3, sm: 4 }}
        sx={{ alignItems: { sm: 'stretch' }, justifyContent: descriptionText ? 'flex-start' : 'center' }}
      >
        {specsContent}
        {descriptionContent}
      </Grid>
    </ContainerWrapper>
  );
}

ProjectSpecsDescription.propTypes = {
  specifications: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      label: PropTypes.string,
      labelKey: PropTypes.string,
      value: PropTypes.string,
      valueKey: PropTypes.string
    })
  ).isRequired,
  descriptionKey: PropTypes.string,
  specsTitleKey: PropTypes.string
};

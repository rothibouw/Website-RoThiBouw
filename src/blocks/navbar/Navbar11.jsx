'use client';
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';

import { BORDER_RADIUS } from '@/utils/constant';

// Override media queries injected by theme.mixins.toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '@media all': {
    minHeight: 108,
    paddingLeft: 0,
    paddingRight: 0
  },
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    '@media all': {
      minHeight: 88
    },
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5)
  },
  [theme.breakpoints.down('sm')]: {
    '@media all': {
      minHeight: 64
    },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

/***************************  NAVBAR - 11  ***************************/

export default function Navbar11({ children }) {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ background: 'transparent' }}>
      <ContainerWrapper>
        <StyledToolbar>
          <Box sx={{ width: 1, px: { xs: 1.5, sm: 3 }, py: { xs: 0.5, sm: 2 }}}>
            {children}
          </Box>
        </StyledToolbar>
      </ContainerWrapper>
    </AppBar>
  );
}

Navbar11.propTypes = { children: PropTypes.any };

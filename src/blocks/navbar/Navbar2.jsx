'use client';
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';

// @types

// override media queries injected by theme.mixins.toolbar
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
      minHeight: 96
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

/***************************  NAVBAR - 2  ***************************/

export default function Navbar2({ children }) {
  return (
    <ContainerWrapper>
      <AppBar position="static" color="inherit" elevation={0} sx={{ background: 'transparent' }}>
        <StyledToolbar>
          <Box
            sx={{ width: 1, px: { xs: 1.5, sm: 3 }, py: { xs: 0.5, sm: 2 }, bgcolor: 'grey.100', borderRadius: { xs: 3, sm: 4, md: 6 } }}
          >
            {children}
          </Box>
        </StyledToolbar>
      </AppBar>
    </ContainerWrapper>
  );
}

Navbar2.propTypes = { children: PropTypes.any };

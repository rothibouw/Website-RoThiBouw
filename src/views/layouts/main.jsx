'use client';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';

// @project
import { Footer9 } from '@/blocks/footer';
import { Navbar11 } from '@/blocks/navbar';
import { NavbarContent11 } from '@/blocks/navbar/navbar-content';

// @data
import { useNavbarData } from './data/navbar';

import { companyInfo, bottomBar } from './data';

/***************************  LAYOUT - MAIN  ***************************/

export default function MainLayout({ children }) {
  const navbar = useNavbarData();

  return (
    <>
      {/* Header section */}
      <Box sx={{ bgcolor: 'grey.100' }}>
        <Navbar11>
          <NavbarContent11 {...navbar} />
        </Navbar11>
      </Box>
      {/* Page content */}
      <main>{children}</main>
      {/* Footer section */}
      <Footer9 companyInfo={companyInfo} bottomBar={bottomBar} />;
    </>
  );
}

MainLayout.propTypes = { children: PropTypes.any };

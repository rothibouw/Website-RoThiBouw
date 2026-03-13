'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import Logo from '@/components/logo';
import { Customization, MenuPopper, NavMenu, NavMenuDrawer } from '@/components/navbar';
import SvgIcon from '@/components/SvgIcon';

// @types

/***************************  NAVBAR - CONTENT 2  ***************************/

export default function NavbarContent2({ navItems }) {
  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Logo />
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
        {!downMD && navItems && (
          <Box sx={{ flexGrow: 1 }}>
            <NavMenu {...{ navItems }} />
          </Box>
        )}
        <Stack direction="row" sx={{ gap: { xs: 1, md: 1.5 } }}>
          {!downMD && <Customization showThemeToggle={true} showDirectionToggle={false} showLanguageSelector={true} />}
          {downMD && (
            <Box sx={{ flexGrow: 1, ...(!navItems && downMD && { display: { xs: 'flex', sm: 'none' } }) }}>
              <MenuPopper
                offset={downSM ? 12 : 28}
                toggleProps={{
                  children: <SvgIcon name="tabler-menu-2" color="text.primary" />,
                  color: 'inherit',
                  sx: { minWidth: 40, width: 40, height: 40, p: 0 }
                }}
              >
                <ContainerWrapper>
                  {navItems && (
                    <Box sx={{ mx: -2 }}>
                      <NavMenuDrawer {...{ navItems }} />
                    </Box>
                  )}
                </ContainerWrapper>
              </MenuPopper>
            </Box>
          )}
          {downMD && <Customization showThemeToggle={true} showDirectionToggle={false} showLanguageSelector={true} />}
        </Stack>
      </Stack>
    </Stack>
  );
}

NavbarContent2.propTypes = {
  navItems: PropTypes.any
};

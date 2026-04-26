'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { Copyright } from '@/components/footer';
import LogoSection from '@/components/logo';
import MotionWrapper from '@/components/MotionWrapper';
import SvgIcon from '@/components/SvgIcon';

import useTranslation from '@/hooks/useTranslation';

import { CopyrightType } from '@/enum';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FOOTER - 9 / HELPER  ***************************/

function InfoItem({ labelKey, icon, value, href }) {
  const { t } = useTranslation();

  const itemContent = (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SvgIcon name={icon} color="primary.main" size={18} />
      </Box>
      <Stack sx={{ gap: 0 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1 }}>
          {t(labelKey)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, lineHeight: 1.2 }}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );

  if (href) {
    return (
      <Link
        component={NextLink}
        href={href}
        sx={{
          textDecoration: 'none',
          display: 'block',
          '&:hover': {
            '& .MuiTypography-root:last-child': {
              color: 'primary.main'
            }
          }
        }}
      >
        {itemContent}
      </Link>
    );
  }

  return itemContent;
}

/***************************  FOOTER - 9  ***************************/

export default function Footer9({ companyInfo, bottomBar = {} }) {
  const { t } = useTranslation();
  const { copyrightType = 'TYPE3', legalLinks = [] } = bottomBar;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack id="footer-9" role="contentinfo" aria-label="Footer 9" sx={{ gap: { xs: 3, sm: 4 } }}>
        <MotionWrapper delay={0.2} duration={0.5}>
          <Stack sx={{ alignItems: 'center', gap: { xs: 3, sm: 4 } }}>
            <LogoSection />
            {companyInfo?.infoItems && companyInfo.infoItems.length > 0 && (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{
                  gap: { xs: 2, sm: 3, md: 4 },
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
              >
                {companyInfo.infoItems.map((item, index) => (
                  <InfoItem key={index} {...item} />
                ))}
              </Stack>
            )}
          </Stack>
        </MotionWrapper>
        <MotionWrapper delay={0.3} duration={0.5}>
          <GraphicsCard sx={{ borderRadius: { xs: 6, sm: 8 } }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'space-between' },
                gap: { xs: 2, sm: 1.5 },
                py: { xs: 2, sm: 1.5 },
                px: { xs: 2, sm: 3 }
              }}
            >
              <Copyright type={CopyrightType[copyrightType]} />
              {legalLinks.length > 0 && (
                <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
                  {legalLinks.map((link, index) => (
                    <Box key={index}>
                      <Link
                        component={NextLink}
                        href={link.href}
                        sx={{
                          textDecoration: 'none',
                          color: 'text.secondary',
                          fontSize: '0.875rem',
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }}
                      >
                        {t(link.label)}
                      </Link>
                    </Box>
                  ))}
                </Stack>
              )}
            </Stack>
          </GraphicsCard>
        </MotionWrapper>
      </Stack>
    </ContainerWrapper>
  );
}

Footer9.propTypes = {
  companyInfo: PropTypes.shape({
    infoItems: PropTypes.arrayOf(
      PropTypes.shape({
        labelKey: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        href: PropTypes.string
      })
    )
  }),
  bottomBar: PropTypes.shape({
    copyrightType: PropTypes.string,
    legalLinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired
      })
    )
  })
};

'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import { ContactUsForm2 } from '@/components/contact-us';
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY, BORDER_RADIUS } from '@/utils/constant';

/***************************  CONTACT US - CARD  ***************************/

function ContactCard({ icon, titleKey, descriptionKey, link }) {
  const { t } = useTranslation();

  // Normalize link to always be an array
  const links = link ? (Array.isArray(link) ? link : [link]) : [];

  return (
    <GraphicsCard sx={{ height: 1 }}>
      <Stack direction={{ xs: 'row', sm: 'column' }} sx={{ gap: { xs: 2, sm: 4, md: 5 }, height: 1, p: { xs: 2, sm: 3, md: 4 } }}>
        <Avatar sx={{ width: 60, height: 60, bgcolor: 'grey.300' }}>
          <SvgIcon name={icon} />
        </Avatar>
        <Stack sx={{ gap: { xs: 2, md: 3 }, height: 1, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Typeset
            {...{
              heading: t(titleKey),
              caption: t(descriptionKey),
              stackProps: { sx: { gap: 1 } },
              headingProps: { variant: 'h4' },
              captionProps: { variant: 'body1' }
            }}
          />
          {links.length > 0 && (
            <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
              {links.map((linkItem, index) => (
                <ButtonAnimationWrapper key={index}>
                  <Button color="primary" variant="outlined" {...(linkItem.href && { component: NextLink })} href={linkItem.href}>
                    {t(linkItem.children)}
                  </Button>
                </ButtonAnimationWrapper>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </GraphicsCard>
  );
}

/***************************  CONTACT US - 4  ***************************/

export default function ContactUs4({ headingKey, captionKey, list, showForm = true }) {
  const { t } = useTranslation();
  const sectionPadding = { xs: 2, sm: 3, md: 5 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Grid container spacing={1.5}>
          {showForm && (
            <Grid size={12}>
              <MotionWrapper delay={0.4} duration={0.4}>
                <GraphicsCard sx={{ height: 1, borderRadius: BORDER_RADIUS.xs }}>
                  <GraphicsCard sx={{ bgcolor: 'grey.200', borderRadius: BORDER_RADIUS.xs }}>
                    <Box sx={{ p: { xs: 2, sm: 4, md: 5 } }}>
                      {headingKey && (
                        <Typeset
                          {...{
                            heading: t(headingKey),
                            caption: t(captionKey),
                            stackProps: { sx: { alignItems: 'center', textAlign: 'center' } },
                            headingProps: { sx: { maxWidth: { xs: '85%', sm: '80%' } } },
                            captionProps: { sx: { maxWidth: { sm: '60%' } } }
                          }}
                        />
                      )}
                    </Box>
                  </GraphicsCard>
                  <Box sx={{ p: sectionPadding, px: { md: 24 } }}>
                    <ContactUsForm2 />
                  </Box>
                </GraphicsCard>
              </MotionWrapper>
            </Grid>
          )}
          {list?.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4 }}>
              <MotionWrapper delay={0.2 + index * 0.1}>
                <ContactCard {...{ ...item }} />
              </MotionWrapper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

ContactCard.propTypes = { icon: PropTypes.any, titleKey: PropTypes.any, descriptionKey: PropTypes.any, link: PropTypes.any };

ContactUs4.propTypes = { headingKey: PropTypes.any, captionKey: PropTypes.any, list: PropTypes.any, showForm: PropTypes.bool };

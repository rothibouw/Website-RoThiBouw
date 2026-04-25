'use client';
import PropTypes from 'prop-types';

// @next
import Image from 'next/image';
import NextLink from 'next/link';

// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import SvgIcon from '@/components/SvgIcon';

import useTranslation from '@/hooks/useTranslation';

import { BORDER_RADIUS } from '@/utils/constant';

import { IconType } from '@/enum';

/***************************  CARDS - PROFILE CARD 5  ***************************/

export default function ProfileCard5({ name, roleKey, quoteKey, avatar, phone, email, linkedin, reverse }) {
  const { t } = useTranslation();

  const imageCol = (
    <Box sx={{ position: 'relative', borderRadius: BORDER_RADIUS.md, overflow: 'hidden', height: { xs: 300, sm: 380, md: 460 } }}>
      <Image src={avatar} alt={name} fill style={{ objectFit: 'cover' }} />
    </Box>
  );

  const infoCol = (
    <Stack spacing={3} sx={{ justifyContent: 'center', height: '100%' }}>
      <Stack spacing={0.5}>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="body1" sx={{ color: 'primary.main' }}>
          {t(roleKey)}
        </Typography>
      </Stack>
      {/* TODO: Uncomment when quotes are available
      <GraphicsCard sx={{ p: { xs: 2.5, md: 3 } }}>
        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontStyle: 'italic' }}>
          {t(quoteKey)}
        </Typography>
      </GraphicsCard>
      */}
      <Stack spacing={1.5}>
        {phone && (
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            component={NextLink}
            href={`tel:${phone}`}
            sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
          >
            <SvgIcon name="tabler-filled-phone" size={20} type={IconType.FILL} />
            <Typography variant="body2">{phone}</Typography>
          </Stack>
        )}
        {email && (
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            component={NextLink}
            href={`mailto:${email}`}
            sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
          >
            <SvgIcon name="tabler-filled-mail" size={20} type={IconType.FILL} />
            <Typography variant="body2">{email}</Typography>
          </Stack>
        )}
        {linkedin && (
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            component={NextLink}
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
          >
            <SvgIcon name="tabler-filled-linkedin" size={20} type={IconType.FILL} />
            <Typography variant="body2">LinkedIn</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: 4, md: 6 },
        alignItems: 'center'
      }}
    >
      {reverse ? (
        <>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>{infoCol}</Box>
          {imageCol}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>{infoCol}</Box>
        </>
      ) : (
        <>
          {imageCol}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>{infoCol}</Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>{infoCol}</Box>
        </>
      )}
    </Box>
  );
}

ProfileCard5.propTypes = {
  name: PropTypes.string.isRequired,
  roleKey: PropTypes.string.isRequired,
  quoteKey: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  phone: PropTypes.string,
  email: PropTypes.string,
  linkedin: PropTypes.string,
  reverse: PropTypes.bool
};

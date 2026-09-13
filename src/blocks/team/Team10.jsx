'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import ProfileCard5 from '@/components/cards/profile-card/ProfileCard5';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TEAM - FOUNDER PROFILES 1  ***************************/

export default function Team10({ headingKey, captionKey, members }) {
  const { t } = useTranslation();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack spacing={{ xs: 6, md: 8 }}>
        {(headingKey || captionKey) && (
          <Typeset
            heading={headingKey ? t(headingKey) : undefined}
            caption={captionKey ? t(captionKey) : undefined}
            stackProps={{ sx: { alignItems: 'center' } }}
            headingProps={{ sx: { textAlign: 'center' } }}
            captionProps={{ sx: { textAlign: 'center' } }}
          />
        )}
        <Stack spacing={{ xs: 8, md: 10 }}>
          {members?.map((member, index) => (
            <MotionWrapper key={index} variant="slideInFromBottom" delay={0.2 * index}>
              <ProfileCard5 {...member} reverse={index % 2 !== 0} />
            </MotionWrapper>
          ))}
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Team10.propTypes = {
  headingKey: PropTypes.string,
  captionKey: PropTypes.string,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      roleKey: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string,
      linkedin: PropTypes.string
    })
  )
};

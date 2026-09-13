'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';

// @project
import ApplyForm from '@/components/apply/ApplyForm';
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  VACANCIES - APPLY SECTION  ***************************/

export default function ApplySection1({ vacancies, defaultPosition = '' }) {
  const { t } = useTranslation();

  return (
    <ContainerWrapper id="apply" sx={{ py: SECTION_COMMON_PY, bgcolor: 'grey.100' }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 }, maxWidth: 800, mx: 'auto', width: 1 }}>
        <MotionWrapper>
          <Typeset
            heading={t('vacancies.applyForm.heading')}
            caption={t('vacancies.applyForm.caption')}
            stackProps={{ sx: { textAlign: 'center', alignItems: 'center' } }}
            headingProps={{ variant: 'h2', component: 'h2' }}
            captionProps={{ variant: 'body1' }}
          />
        </MotionWrapper>
        <ApplyForm vacancies={vacancies} defaultPosition={defaultPosition} />
      </Stack>
    </ContainerWrapper>
  );
}

ApplySection1.propTypes = {
  vacancies: PropTypes.array.isRequired,
  defaultPosition: PropTypes.string
};

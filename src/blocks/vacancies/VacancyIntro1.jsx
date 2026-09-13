'use client';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  VACANCIES - INTRO  ***************************/

export default function VacancyIntro1() {
  const { t } = useTranslation();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <MotionWrapper>
        <Stack sx={{ gap: 3, alignItems: 'center', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
          <Typeset
            heading={
              <>
                {t('vacancies.intro.heading')}{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {t('vacancies.intro.highlight')}
                </Box>
              </>
            }
            caption={t('vacancies.intro.caption')}
            stackProps={{ sx: { alignItems: 'center', textAlign: 'center' } }}
            headingProps={{ variant: 'h2', component: 'h1' }}
            captionProps={{ variant: 'body1' }}
          />
          <ButtonAnimationWrapper>
            <Button href="#apply" variant="contained" color="primary" size="large">
              {t('vacancies.intro.button')}
            </Button>
          </ButtonAnimationWrapper>
        </Stack>
      </MotionWrapper>
    </ContainerWrapper>
  );
}

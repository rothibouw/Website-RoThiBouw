'use client';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';

// @project
import ApplyForm from '@/components/apply/ApplyForm';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';
import useTranslation from '@/hooks/useTranslation';
import { SECTION_COMMON_PY, BORDER_RADIUS } from '@/utils/constant';

/***************************  VACANCY APPLY - 1  ***************************/

export default function VacancyApply1({ headingKey, captionKey, vacancies, defaultPosition }) {
  const { t } = useTranslation();
  const sectionPadding = { xs: 2, sm: 3, md: 5 };

  return (
    <Box id="apply">
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <MotionWrapper delay={0.2} duration={0.4}>
          <GraphicsCard sx={{ borderRadius: BORDER_RADIUS.xs }}>
            <GraphicsCard sx={{ bgcolor: 'grey.200', borderRadius: BORDER_RADIUS.xs }}>
              <Box sx={{ p: { xs: 2, sm: 4, md: 5 } }}>
                <Typeset
                  {...{
                    heading: t(headingKey),
                    caption: t(captionKey),
                    stackProps: { sx: { alignItems: 'center', textAlign: 'center' } },
                    headingProps: { sx: { maxWidth: { xs: '85%', sm: '80%' } } },
                    captionProps: { sx: { maxWidth: { sm: '60%' } } }
                  }}
                />
              </Box>
            </GraphicsCard>
            <Box sx={{ p: sectionPadding, px: { md: 24 } }}>
              <ApplyForm vacancies={vacancies} defaultPosition={defaultPosition} />
            </Box>
          </GraphicsCard>
        </MotionWrapper>
      </ContainerWrapper>
    </Box>
  );
}

VacancyApply1.propTypes = {
  headingKey: PropTypes.string,
  captionKey: PropTypes.string,
  vacancies: PropTypes.array,
  defaultPosition: PropTypes.string
};

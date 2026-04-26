import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

// @project
import SvgIcon from './SvgIcon';

/***************************  COMMON - SLICK ARROWS  ***************************/

export default function SlickArrows({ sliderRef, variant = 'outlined' }) {
  const outlinedStyle = {
    height: 64,
    width: 64,
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'grey.600',
    color: 'text.primary',
    pointerEvents: 'auto'
  };

  const containedStyle = {
    height: 48,
    width: 48,
    borderRadius: '50%',
    backgroundColor: 'primary.main',
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'primary.dark'
    },
    pointerEvents: 'auto'
  };

  const buttonStyle = variant === 'contained' ? containedStyle : outlinedStyle;
  const iconColor = variant === 'contained' ? 'primary.contrastText' : 'currentColor';

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        px: { xs: 1, md: 2 },
        zIndex: 2,
        pointerEvents: 'none'
      }}
    >
      <IconButton sx={buttonStyle} onClick={() => sliderRef.current?.slickPrev()} rel="noopener noreferrer" aria-label="previous">
        <SvgIcon name="tabler-arrow-left" color={iconColor} />
      </IconButton>
      <IconButton sx={buttonStyle} onClick={() => sliderRef.current?.slickNext()} rel="noopener noreferrer" aria-label="next">
        <SvgIcon name="tabler-arrow-right" color={iconColor} />
      </IconButton>
    </Box>
  );
}

SlickArrows.propTypes = {
  sliderRef: PropTypes.any,
  variant: PropTypes.oneOf(['outlined', 'contained'])
};

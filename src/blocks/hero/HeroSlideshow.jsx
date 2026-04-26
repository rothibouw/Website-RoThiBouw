'use client';
import PropTypes from 'prop-types';

// @react
import { useRef } from 'react';

// @next
import Image from 'next/image';

// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

// @third-party
import Slider from 'react-slick';

// @project
import SlickArrows from '@/components/SlickArrows';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  HERO SLIDESHOW  ***************************/

export default function HeroSlideshow({ slides, height = { xs: 400, sm: 500, md: 600 }, showText = true }) {
  const theme = useTheme();
  const sliderRef = useRef(null);
  const { t } = useTranslation();
  const highlightColor = theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.main;

  // If only one slide, render static header image
  const isSingleSlide = slides.length === 1;

  const settings = {
    autoplay: !isSingleSlide,
    autoplaySpeed: 5000,
    arrows: false,
    dots: !isSingleSlide,
    infinite: !isSingleSlide,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    swipe: true,
    touchThreshold: 10,
    pauseOnHover: true
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        pb: SECTION_COMMON_PY,
        '.slick-slider': {
          height: '100%'
        },
        '.slick-list, .slick-track': {
          height: '100%'
        },
        '.slick-slide > div': {
          height: '100%'
        },
        '.slick-dots': {
          display: isSingleSlide ? 'none' : undefined,
          bottom: { xs: 16, md: 24 },
          zIndex: 2,
          'li button:before': {
            fontSize: 12,
            color: '#fff',
            opacity: 0.5
          },
          'li.slick-active button:before': {
            color: '#fff',
            opacity: 1
          }
        }
      }}
    >
      {isSingleSlide ? (
        <Box sx={{ position: 'relative', height: '100%' }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
          >
            <Image
              src={slides[0].image}
              alt={slides[0].title || 'Header Image'}
              fill
              style={{ objectFit: 'cover', objectPosition: slides[0].objectPosition || 'center' }}
              priority
            />
            {showText && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0.3)} 0%, ${alpha(theme.palette.common.black, 0.5)} 100%)`
                }}
              />
            )}
          </Box>
          {showText && slides.length > 0 && (slides[0].title || slides[0].description) && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                px: { xs: 2, sm: 4, md: 6 }
              }}
            >
              <MotionWrapper style={{ display: 'inline-block', height: 'auto' }}>
                <Typeset
                  heading={
                    slides[0].title ? (
                      <>
                        {t(slides[0].title)}
                        {slides[0].titleHighlight && (
                          <>
                            {' '}
                            <Box component="span" sx={{ color: highlightColor }}>
                              {t(slides[0].titleHighlight)}
                            </Box>
                          </>
                        )}
                      </>
                    ) : (
                      ''
                    )
                  }
                  caption={slides[0].description ? t(slides[0].description) : ''}
                  stackProps={{
                    sx: {
                      textAlign: 'center',
                      alignItems: 'center',
                      maxWidth: 800
                    }
                  }}
                  headingProps={{
                    sx: {
                      color: 'white'
                    }
                  }}
                  captionProps={{
                    sx: {
                      color: 'white'
                    }
                  }}
                />
              </MotionWrapper>
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Slider {...settings} ref={sliderRef}>
            {slides.map((slide, index) => (
              <Box key={index} sx={{ position: 'relative', height: '100%' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title || `Slide ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: slide.objectPosition || 'center' }}
                    priority={index === 0}
                  />
                  {showText && (
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0.3)} 0%, ${alpha(theme.palette.common.black, 0.5)} 100%)`
                      }}
                    />
                  )}
                </Box>
                {showText && (slide.title || slide.description) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                      px: { xs: 2, sm: 4, md: 6 }
                    }}
                  >
                    <MotionWrapper style={{ display: 'inline-block', height: 'auto' }}>
                      <Typeset
                        heading={
                          slide.title ? (
                            <>
                              {slide.label && (
                                <Typography variant="overline" sx={{ color: 'primary.main', display: 'block', mb: 1 }}>
                                  {t(slide.label)}
                                </Typography>
                              )}
                              {t(slide.title)}
                              {slide.titleHighlight && (
                                <>
                                  {' '}
                                  <Box component="span" sx={{ color: highlightColor }}>
                                    {t(slide.titleHighlight)}
                                  </Box>
                                </>
                              )}
                            </>
                          ) : (
                            ''
                          )
                        }
                        caption={t(slide.description)}
                        stackProps={{
                          sx: {
                            textAlign: 'center',
                            alignItems: 'center',
                            maxWidth: 800
                          }
                        }}
                        headingProps={{
                          sx: {
                            color: 'white'
                          }
                        }}
                        captionProps={{
                          sx: {
                            color: 'white'
                          }
                        }}
                      />
                    </MotionWrapper>
                  </Box>
                )}
              </Box>
            ))}
          </Slider>
          <SlickArrows sliderRef={sliderRef} variant="contained" />
        </>
      )}
    </Box>
  );
}

HeroSlideshow.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      label: PropTypes.string,
      titleHighlight: PropTypes.string,
      objectPosition: PropTypes.string // CSS object-position value (e.g., 'center', 'center top', 'center 30%')
    })
  ).isRequired,
  height: PropTypes.object,
  showText: PropTypes.bool
};

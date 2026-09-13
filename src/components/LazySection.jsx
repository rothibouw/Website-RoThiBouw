'use client';
import PropTypes from 'prop-types';

// @react
import { useState, useRef, useEffect, createElement, useMemo } from 'react';

// @mui
import Box from '@mui/material/Box';

// @project
import Loader from '@/components/Loader';

/***************************  COMMON - LAZY SECTION  ***************************/

/**
 * Loads below-the-fold sections once they scroll into view.
 *
 * Anything rendered here is client-only, so it never reaches the server HTML —
 * keep a page's first section (its heading in particular) outside of this.
 */
export default function LazySection({ sections, fallback = <Loader />, offset = '0px', placeholderHeight = 400 }) {
  const sectionList = useMemo(() => (Array.isArray(sections) ? sections : [sections]), [sections]);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedComponents, setLoadedComponents] = useState(null);
  const ref = useRef(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const load = () => {
      if (hasLoaded.current) return;
      hasLoaded.current = true;
      setIsVisible(true);

      // allSettled, not all: one failing import must not blank the whole page
      Promise.allSettled(sectionList.map((section) => section.importFunc().then((module) => module.default))).then((results) => {
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(`LazySection: section ${index} failed to load`, result.reason);
          }
        });
        setLoadedComponents(results.map((result) => (result.status === 'fulfilled' ? result.value : null)));
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: offset, threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [sectionList, offset]);

  return (
    <Box ref={ref} sx={{ ...(!loadedComponents && { minHeight: placeholderHeight }) }}>
      {loadedComponents
        ? sectionList.map((section, index) =>
            loadedComponents[index] ? createElement(loadedComponents[index], { key: index, ...section.props }) : null
          )
        : isVisible && fallback}
    </Box>
  );
}

LazySection.propTypes = {
  sections: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
  fallback: PropTypes.node,
  offset: PropTypes.string,
  placeholderHeight: PropTypes.number
};

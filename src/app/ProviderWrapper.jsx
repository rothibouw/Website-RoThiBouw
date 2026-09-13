'use client';
import PropTypes from 'prop-types';

// @project
import RTLLayout from '@/components/RTLLayout';
import ThemeProvider from '@/components/ThemeProvider';
import { ConfigProvider } from '@/contexts/ConfigContext';

/***************************  COMMON - CONFIG  ***************************/

export default function ProviderWrapper({ children }) {
  /**
   * Children render straight away — no mount gate. The config starts from its
   * defaults on both server and client (see useLocalStorage), so the theme
   * palette and fontFamily match on hydration and every page ships real,
   * crawlable HTML instead of a loader.
   */
  return (
    <ConfigProvider>
      <ThemeProvider>
        <RTLLayout>{children}</RTLLayout>
      </ThemeProvider>
    </ConfigProvider>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.any };

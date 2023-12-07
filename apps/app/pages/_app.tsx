import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createEmotionCache,
  lightThemeOptions,
} from '@daruma-board/web/design-system';
import './styles.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [loading, setLoading] = useState<boolean>(true); // [loading, setLoading

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');

    const validateToken = async (token: string) => {
      setLoading(true);
      await fetch('/api/me', {
        method: 'POST',
        body: JSON.stringify({ token }),
      })
        .then(async (res) => {
          console.log(res);
          const body = await res.json();

          if (res.status === 200) {
            setLoading(false);
            localStorage.setItem('token', body.token);
          } else {
            router.push('/login');
            setLoading(false);
            localStorage.removeItem('token');
            localStorage.removeItem('localEmail');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    const routeToLogin = async () => {
      await router.push('/login');
      localStorage.removeItem('token');
      localStorage.removeItem('localEmail');
      setLoading(false);
    };

    if (token) {
      validateToken(token);
    } else {
      routeToLogin();
    }
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

import { Box } from '../core';
import React from 'react';
export const PageLayout = ({ children }: { children: any }) => {
  return React.createElement(
    Box,
    {
      sx: {
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        height: '100vh',
        width: '100vw',
        // center content
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    children
  );
};
//# sourceMappingURL=PageLayout.js.map

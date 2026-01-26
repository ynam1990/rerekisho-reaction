import React from 'react';
import 'destyle.css'
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/shared/styles/theme';
import { GlobalStyle } from '../src/shared/styles/GlobalStyle';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle
          headerHeight={0}
          footerHeight={0}
        />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

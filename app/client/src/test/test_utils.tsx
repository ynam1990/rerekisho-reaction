import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/shared/styles/theme';
import type { ReactNode } from 'react';

export const renderWithThemeForTest = (ui: ReactNode) => {
  return render(
    <ThemeProvider theme={ theme }>
      { ui }
    </ThemeProvider>
  );
};

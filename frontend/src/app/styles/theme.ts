export const theme = {
  colors: {
    primary: '#4a6cf7',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    text: '#333333',
    textLight: '#666666',
    border: '#dee2e6',
    background: '#f8f9fa',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  typography: {
    fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: {
      small: '12px',
      base: '14px',
      medium: '16px',
      large: '18px',
      h1: '28px',
      h2: '24px',
      h3: '20px',
      h4: '18px',
      h5: '16px',
      h6: '14px'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      loose: 1.75
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    rounded: '50%'
  },
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)'
  },
  transitions: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s'
  }
};

// 기본 내보내기 추가
export default theme;

// Emotion 타입 정의
declare module '@emotion/react' {
  export interface Theme {
    colors: typeof theme.colors;
    typography: typeof theme.typography;
    spacing: typeof theme.spacing;
    borderRadius: typeof theme.borderRadius;
    breakpoints: typeof theme.breakpoints;
    shadows: typeof theme.shadows;
    transitions: typeof theme.transitions;
  }
}

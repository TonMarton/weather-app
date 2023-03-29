import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      primaryUltraLight: string;
      primaryUltraLightTransparent: string;
      primaryDark: string;
      primaryUltraDark: string;
      secondary: string;
    };
  }
}

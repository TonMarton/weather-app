import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.primaryUltraDark};
    font-family: 'Roboto', sans-serif;
  }

  p {
    margin: 0;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;

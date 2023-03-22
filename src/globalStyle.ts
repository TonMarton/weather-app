import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

  body {
    background-color: ${(props) => props.theme.colors.primaryUltraDark};
    font-family: 'Roboto', sans-serif;
  }

  p {
    margin: 0;
  }
`;

export default GlobalStyle;

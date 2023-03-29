import { createGlobalStyle } from 'styled-components';
import './assets/weather-icons/weather-icons.min.css';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.colors.primaryUltraDark};
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  p {
    margin: 0;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;

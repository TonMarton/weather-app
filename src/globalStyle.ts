import { createGlobalStyle } from 'styled-components';
import './assets/weather-icons/weather-icons.min.css';

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

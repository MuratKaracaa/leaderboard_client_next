import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    ::-webkit-scrollbar {
      display: none;
    }
  }

  html, body, #__next{
    height: 100%;
    width: 100%;
  }

  html {

  }

  body {
    position: relative;
    display: flex;

    margin: 0;
    padding: 0;

    font-family: Verdana, Geneva, Tahoma, sans-serif; 

  }
`;

export default GlobalStyles;

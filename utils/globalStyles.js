import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 24px;
    font-family: 'Poppins', sans-serif;
  }

  body {  
    /* Global Css variables */
    --black: #16162A;
    --white: #fff;
    --grey: #A4A0A0;
    --primary-bg: #3A54AA;
    --primary: #5A88FF;
    --error: red;
    --success: #5bcd96e6;
  }

  @media only screen and (max-width: 768px) {
    html {
      font-size: 13px;
    }
  }

  a {
    color: var(--primary) !important;
    cursor: pointer;
  }
`;
 
export default GlobalStyle;
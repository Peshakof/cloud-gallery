import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: ease 0.3s;
  }
  
  a {
    color: ${({ theme }) => theme.links};
    transition: ease 0.3s;
  }
  `
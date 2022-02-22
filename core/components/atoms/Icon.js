import styled, { css } from "styled-components";

const fontSize = ({size = 'regular'}) => {
  const sizes =  {
    large: '48px',
    medium: '36px',
    regular: '24px',
    small: '18px'
  };

  return sizes[size];
}

const dark = ({light, disabled, color}) => {
  return !color && !light && css`
    opacity: ${disabled? 0.26: 0.54};
    color: var(--black);
  `
}

const light = ({light, disabled, color}) => {
  return !color && light && css`
    opacity: ${disabled? 0.3: 1};
    color: var(--white);
  `
}

const Icon = styled.span`
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';

  font-size: ${fontSize};
  color: ${({color}) => color};

  ${dark}

  ${light}
`;

export default Icon;
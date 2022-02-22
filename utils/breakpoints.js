import { css } from "styled-components";

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
}

const createBreakPoint = key => value => css`
   @media only screen and (min-width: ${breakpoints[key]}px) {
    ${value}
  }
`;

export const small = createBreakPoint('sm');
export const medium = createBreakPoint('md');
export const large = createBreakPoint('lg');
export const extraLarge = createBreakPoint('xl');
export const extraExtraLarge = createBreakPoint('xxl');
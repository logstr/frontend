import styled, { css } from "styled-components";
import Text from "./Text";

const Btn = styled.button`
  min-width: 122px;
  height: 48px;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0px 32px;
  position: relative;
  overflow: hidden;
  width: 100%;
  border: none;
  cursor: pointer;

  p {
    color: var(--color, var(--white)) !important;
    position: relative;
  }

  ${({ light }) =>
    light &&
    css`
      --bg: var(--white);
      --color: var(--black);
    `}

  ${({ primary }) =>
    primary &&
    css`
      --bg: var(--primary);
      --color: var(--white);
    `}

  ${({ opaque }) =>
    opaque &&
    css`
      --color: var(--primary);
    `}

  ${({ outlined }) =>
    outlined &&
    css`
    background: transparent;
    border: 1px solid var(--color, var(--white)));
    border: 1px solid var(--bg, var(--black));

    p {
      color: var(--bg, var(--black)) !important;
    }
  `}

  &::before {
    content: "";
    display: block;
    background: var(--bg, var(--black));
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: ${({ opaque }) => (opaque ? 0.3 : 1)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button = ({ children, ...props }) => {
  return (
    <Btn {...props}>
      <Text variant="medium-16">{children}</Text>
    </Btn>
  );
};

export default Button;

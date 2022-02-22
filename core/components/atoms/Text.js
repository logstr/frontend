import styled, { css } from "styled-components";

const fontSize = (size = 10) => {
  const lineHeight = () => {
    switch (+size) {
      case 16:
        return "24px";
      case 13:
        return "18px";
      case 10:
      case 12:
      default:
        return "14px";
    }
  };
  return css`
    font-style: normal;
    font-size: ${size}px;
    line-height: ${lineHeight()};
  `;
};

const weight = (variant = "regular") => {
  switch (variant) {
    case "medium":
      return "500";
    case "semi":
      return "600";
    case "regular":
    default:
      return "normal";
  }
};

const variants = ({ variant = "regular-10" }) => {
  const [w, size] = variant.split("-");
  return css`
    font-weight: ${weight(w)};
    ${fontSize(size)};
  `;
};

const Text = styled.p`
  color: var(--grey);

  ${variants}
`;

export const Label = styled.label`
  ${variants({ variant: "regular-13" })}
  color: var(--black);
`;

export default Text;

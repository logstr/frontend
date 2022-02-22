import Icon from "./Icon";
import styled, {css} from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  height: 44px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  input {
    flex: 1;
    border: none;
    outline: none;
    position: relative;
    z-index: +1;
  }


  input:focus ~ div.outline,
  input:valid ~ div.outline {
    border-color: var(--primary);
  }

  span {
    opacity: 0.4;
  }

  div.outline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid var(--grey);
    border-radius: 10px;
    box-sizing: border-box;
    transition: border-color 0.3s linear;

    ${({ error }) =>
      error &&
      css`
        border-color: var(--error) !important;
      `}

    ${({ success }) =>
      success &&
      css`
        border-color: var(--success) !important;
      `}
  }
`;

const Input = ({
  name,
  id,
  status,
  type,
  className,
  icon,
  Suffix,
  ...props
}) => {
  return (
    <InputWrapper
      className={className}
      error={status === "error"}
      success={status === "success"}
    >
      <input name={name} id={id || name} type={type} {...props} />
      <div className="outline"></div>

      {Suffix && <Suffix />}
      {icon && <Icon>{icon}</Icon>}
    </InputWrapper>
  );
};

export default Input;

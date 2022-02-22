import { Fragment } from "react";
import styled, { css } from "styled-components";
import Input from "../atoms/Input";
import Text, { Label } from "../atoms/Text";

const Wrapper = styled.div`
  text-align: left;
`;

const Field = styled(Input)`
  margin: 8px 0;
`;

const Message = styled(Text)`
  ${({error}) => error && css`
    color: var(--error);
  `}

  ${({success}) => success && css`
    color: var(--success);
  `}
`;

const InputField = ({
  label,
  name,
  id,
  error,
  success,
  wrapped = true,
  ...props
}) => {
  const Wrapped = wrapped ? Wrapper : Fragment;
  const status = error ? "error" : success ? "success" : "";

  return (
    <Wrapped>
      <Label htmlFor={id || name}>{label}</Label>
      <Field status={status} id={id} name={name} {...props} />
      <Message error={error} success={success}>
        {error || success || ""}
      </Message>
    </Wrapped>
  );
};

export default InputField;

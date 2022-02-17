import AuthLayout from "../../core/layouts/Auth";
import { Trans } from '@lingui/macro';
import styled from "styled-components";
import useLocale from "../../core/hooks/useLocale";

const Title = styled.h1`
  color: yellow;
`;

const Login = () => {
  return <Title>
    <Trans>Test Test</Trans>
  </Title>
}

Login.getLayout = AuthLayout;

export default Login;
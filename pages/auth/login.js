import AuthLayout from "../../core/layouts/Auth";
import { Trans } from '@lingui/macro';

const Login = () => {
  return <h1><Trans>Test Test</Trans></h1>
}

Login.getLayout = AuthLayout;

export default Login;
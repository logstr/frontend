import styled, { css } from "styled-components";
import logo from "@/public/images/logo.svg";
import Image from "next/image";
import Title from "@/components/atoms/Title";
import { Trans, t } from "@lingui/macro";
import Text from "@/components/atoms/Text";
import InputField from "@/components/molecules/InputField";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import Link from "next/link";
import { GoogleButton } from "@/components/molecules/SocialButtons";
import { large } from "utils/breakpoints";
import useForm from "@/hooks/useForm";
import useRequest from "@/hooks/useRequest";
import { login } from "services/api/auth";
import { signIn } from "services/authentication";
import { useSessionRedirects } from "@/hooks/useSession";

const Form = styled.form`
  text-align: center;
  padding: 15px 0;

  & > span:first-child {
    margin-bottom: 58px !important;
  }

  h1 {
    margin-bottom: 18px;
  }

  & > p.text {
    margin-bottom: 35px;
  }

  button {
    margin: 12.5px 0;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 47px;

  span {
    display: flex;
    align-items: center;

    p {
      margin-left: 10px;
    }
  }
`;

const CTA = styled(Text)`
  margin-top: 64px;

  a {
    margin-left: 10px;
  }

  ${large(css`
    margin-top: 100px;
  `)}
`;

const LoginForm = () => {
  const { fromLogin } = useSessionRedirects();

  function authenticate({email, password, remember}) {
    return login(email, password, remember).then(signIn).then(fromLogin)
  }

  const { isLoading, isError, send: onSuccess, response } = useRequest(authenticate);
  const { values, submit, errors, setValue } = useForm({
    values: { email: "", password: "", remember: false },
    onSuccess,
    validate,
  });

  function validate(values) {
    const errorList = {};
    if (!values.email) {
      errorList.email = t`Email address is required`;
    }

    if (!values.password) {
      errorList.password = t`Password is requried`;
    }

    return errorList;
  }

  return (
    <Form onSubmit={submit}>
      <Image src={logo} />
      <Title>
        <Trans>Hello Again!</Trans>
      </Title>
      <Text className="text">
        <Trans>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
          tellus odio platea sagittis vel.
        </Trans>
      </Text>

      <InputField
        placeholder="email@address.com..."
        label={t`Email Address`}
        name="email"
        icon="alternate_email"
        value={values.email}
        error={errors.email}
        onInput={({ target }) => setValue("email", target.value)}
      />

      <InputField
        placeholder="* * * * * *"
        label={t`Password`}
        name="password"
        type="password"
        icon="shield"
        value={values.password}
        error={errors.password}
        onInput={({ target }) => setValue("password", target.value)}
      />
      <Links>
        <span>
          <Checkbox
            checked={values.remember}
            onChange={() => {}}
            onClick={() => setValue("remember", !values.remember)}
          />
          <Text variant="regular-12">
            <Trans>remember me</Trans>
          </Text>
        </span>

        <Link href="/auth/forgot-password">
          <Text as="a" variant="regular-12">
            <Trans>Recover password</Trans>
          </Text>
        </Link>
      </Links>

      {!isError && response?.status === false && (
        <Text color="error">
          <Trans>
            Email or passsword is incorrect. Please verify and try again!.
          </Trans>
        </Text>
      )}

      <Button primary className="login" disabled={isLoading}>
        <Trans>Login</Trans>
      </Button>

      <GoogleButton />

      <CTA>
        <Trans>Don’t have an account yet?</Trans>

        <Link href="/auth/signup">
          <Text as="a" variant="semi-12">
            <Trans> Sign Up</Trans>
          </Text>
        </Link>
      </CTA>
    </Form>
  );
};

export default LoginForm;

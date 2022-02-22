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
import { useState } from "react";
import { GoogleButton } from "@/components/molecules/SocialButtons";
import { large } from "utils/breakpoints";

const Form = styled.form`
  text-align: center;
  padding: 15px 0;

  & > span:first-child {
    margin-bottom: 58px !important;
  }

  h1 {
    margin-bottom: 18px;
  }

  & > p:not(:last-child) {
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
  const [checked, setChecked] = useState(true);
  return (
    <Form>
      <Image src={logo} />
      <Title>
        <Trans>Hello Again!</Trans>
      </Title>
      <Text>
        <Trans>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
          tellus odio platea sagittis vel.
        </Trans>
      </Text>

      <InputField
        placeholder="Boogie..."
        label={t`User name`}
        name="username"
        icon="alternate_email"
      />

      <InputField
        placeholder="* * * * * *"
        label={t`Password`}
        name="password"
        type="password"
        icon="shield"
      />
      <Links>
        <span>
          <Checkbox
            checked={checked}
            onChange={() => {}}
            onClick={() => setChecked(!checked)}
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

      <Button primary className="login">
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

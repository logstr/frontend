import { t } from "@lingui/macro";
import Image from "next/image";
import Button from "../atoms/Button";
import Google from "@/public/images/auth/google.svg";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span.logo {
    margin-right: 18px;
    height: 30px;
  }
`;

export const GoogleButton = ({ label = t`sign in with google` }) => {
  return (
    <Button primary opaque>
      <Content>
        <span className="logo">
          <Image src={Google} />
        </span>
        {label}
      </Content>
    </Button>
  );
};

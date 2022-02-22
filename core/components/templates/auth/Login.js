import Image from "next/image";
import { Col, Container, Hidden, Row } from "react-grid-system";
import styled from "styled-components";

import selector from "../../../../public/images/page-selector.svg"
import LoginForm from "../../organisms/auth/LoginForm";

const SideCol = styled(Col)`
  background: var(--primary-bg) url(/images/auth/login-bg.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 85px;
`;

const FormRow = styled(Row)`
  height: 100vh;
`;

const LoginPage = () => {
  return (
    <Container fluid>
      <Row>
        <Hidden sm xs md>
          <SideCol>
            <Image src={selector} width={95} height={17} />
          </SideCol>
        </Hidden>
        <Col>
          <FormRow align="center">
            <Col xs={1} md={2} xl={3}></Col>
            <Col xs={10} md={8} xl={6}>
              <LoginForm />
            </Col>
            <Col xs={1} md={2} xl={3}></Col>
          </FormRow>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

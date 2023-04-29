import { FormEventHandler, RefObject, useCallback, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import PATHS from "@/common/paths";
import { setCookie } from "@/common/utils/cookie";
import { saveToStore } from "@/common/utils/localStorage";

import Layout from "@/components/layout/Layout";
import TextInput from "@/components/textInput/TextInput";
import SubmitButton from "@/components/button/SubmitButton";
import breakpoints from "@/components/breakpoints";

import { postRequest } from "@/service/httpService";
import serviceUrls from "@/service/serviceUrls";
import { LoginRequest, LoginResponse } from "@/service/models/Login";

const StyledLoginFrom = styled.form`
  position: absolute;
  bottom: 250px;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  width: 350px;

  padding: 16px;

  margin-left: auto;
  margin-right: auto;

  @media ${breakpoints.mobile} {
    gap: 8px;

    width: 80%;
  }
`;

const Login = (): JSX.Element => {
  const router = useRouter();

  const userNameRef = useRef() as RefObject<HTMLInputElement>;
  const passwordRef = useRef() as RefObject<HTMLInputElement>;

  const login = useCallback(async (userName: string, password: string) => {
    try {
      const {
        data: { token },
      } = await postRequest<LoginResponse, LoginRequest>(
        serviceUrls.USER.LOGIN,
        {
          userName,
          password,
        }
      );
      setCookie("AUTH_TOKEN", token);
      saveToStore("AUTH_TOKEN", token);
      router.push(PATHS.HOME);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    login(
      userNameRef.current?.value as string,
      passwordRef.current?.value as string
    );
  };

  return (
    <Layout currentPageKey="login_page_name">
      <StyledLoginFrom onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeHolderKey="login_page_userName_placeHolder"
          ref={userNameRef}
          required
        />
        <TextInput
          type="password"
          placeHolderKey="login_page_password_placeHolder"
          ref={passwordRef}
          required
        />
        <SubmitButton buttonTextKey="login_page_login_button_text" />
      </StyledLoginFrom>
    </Layout>
  );
};

export default Login;

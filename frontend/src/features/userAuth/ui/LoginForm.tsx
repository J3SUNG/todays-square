import { useState } from "react";
import { useAuthModel } from "../model/authModel";
import {
  LoginFormAuthButton,
  LoginFormAuthButtonGroup,
  LoginFormButton,
  LoginFormButtonGroup,
  LoginFormContainer,
  LoginFormFooterLinks,
  LoginFormInput,
  LoginFormInputGroup,
  LoginFormInputLabel,
  LoginFormTitle,
} from "./LoginForm.styles";
import googleImg from "@/shared/assets/authLogin/google.png";
import naverImg from "@/shared/assets/authLogin/naver.png";
import kakaoImg from "@/shared/assets/authLogin/kakao.png";
import githubImg from "@/shared/assets/authLogin/github.png";

export const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthModel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      <LoginFormTitle>Login</LoginFormTitle>
      <LoginFormInputGroup>
        <LoginFormInputLabel htmlFor="email">이메일</LoginFormInputLabel>
        <LoginFormInput
          id="email"
          type="email"
          placeholder="이메일"
          onChange={(e) => setUserName(e.target.value)}
        />
      </LoginFormInputGroup>
      <LoginFormInputGroup>
        <LoginFormInputLabel htmlFor="password">비밀번호</LoginFormInputLabel>
        <LoginFormInput
          id="password"
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
      </LoginFormInputGroup>
      <LoginFormButtonGroup>
        <LoginFormButton primary>로그인</LoginFormButton>
        <LoginFormButton>게스트 로그인</LoginFormButton>
      </LoginFormButtonGroup>
      <LoginFormAuthButtonGroup>
        <LoginFormAuthButton image={googleImg} />
        <LoginFormAuthButton image={naverImg} />
        <LoginFormAuthButton image={kakaoImg} />
        <LoginFormAuthButton image={githubImg} />
      </LoginFormAuthButtonGroup>
      <LoginFormFooterLinks>
        <a href="/signup">회원가입</a>
        <span>|</span>
        <a href="/password-reset">비밀번호 찾기</a>
      </LoginFormFooterLinks>
    </LoginFormContainer>
  );
};

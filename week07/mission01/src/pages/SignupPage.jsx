import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-dom";

const SignsupPage = () => {
  const { isSignUp, isLoading, isError, signUp } = useSignUp();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("올바른 이메일 형식으로 입력해주세요 !")
      .required("이메일을 입력해주세요 !"),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다 !")
      .max(16, "비밀번호는 16자 이하여야 합니다 !")
      .required("비밀번호를 입력해주세요 !"),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다 !")
      .required("비밀번호를 다시 입력해주세요 !"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = async (data) => {
    const { email, password, passwordCheck } = data;

    const result = await signUp(email, password, passwordCheck); // signUp 함수 실행 후 결과 확인

    if (result) {
      reset(); // 회원가입 성공 시 입력 필드 초기화
    }
  };

  return (
    <Wrapper>
      <StyledH1> 회원가입 </StyledH1>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          type="email"
          placeholder="이메일을 입력해주세요 !"
          {...register("email")}
          isValidate={!!errors.email}
        />
        <p style={{ color: "red", margin: "0px", paddingLeft: "12px" }}>
          {errors.email?.message}
        </p>
        <StyledInput
          type="password"
          placeholder="비밀번호를 입력해주세요 !"
          {...register("password")}
          isValidate={!!errors.password}
        />
        <p style={{ color: "red", margin: "0px", paddingLeft: "12px" }}>
          {errors.password?.message}
        </p>
        <StyledInput
          type="password"
          placeholder="비밀번호를 다시 입력해주세요 !"
          {...register("passwordCheck")}
          isValidate={!!errors.passwordCheck}
        />
        <p style={{ color: "red", margin: "0px", paddingLeft: "12px" }}>
          {errors.passwordCheck?.message}
        </p>
        <StyledButton disabled={!isValid}>제출</StyledButton>
      </StyledForm>

      {/* 로딩, 성공 및 실패 메시지 */}
      {isLoading && <StyledP>로딩 중...</StyledP>}
      {isError ? (
        <StyledP>회원가입에 실패했습니다.</StyledP>
      ) : isSignUp ? (
        navigate(`/login`, {
          replace: false,
        })
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #000000;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledH1 = styled.h1`
  color: white;
  margin-top: 100px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 300px;
  height: 30px;
  margin: 10px;
  border-radius: 8px;
  padding: 5px;
  border: 2px solid ${(props) => (props.isValidate ? "red" : "#ccc")};
  outline: none;
  transition: border-color 0.3s ease;
`;

const StyledButton = styled.button`
  width: 314px;
  height: 44px;
  margin: 10px;
  padding: 0px;
  border-radius: 8px;
  font-family: "paybooc-Light", sans-serif;
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  border: none;
  color: ${(props) => (props.disabled ? "#000000" : "#ffffff")};
  background-color: ${(props) => (props.disabled ? "#999999" : "#e10f57")};
  &:not(:disabled):hover {
    background-color: #1e6b7b;
    color: white;
  }
`;

const StyledP = styled.p`
  color: white;
  margin: 0;
`;

export default SignsupPage;

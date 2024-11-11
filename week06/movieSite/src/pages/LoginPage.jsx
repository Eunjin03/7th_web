import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLogin, isLoading, isError, login } = useLoginContext();

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
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);
    const { email, password } = data;
    await login(email, password);
  };

  return (
    <Wrapper>
      <StyledH1> 로그인</StyledH1>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          type={`email`}
          placeholder="이메일을 입력해주세요 !"
          {...register("email")}
          isValidate={!!errors.email}
        />
        <p style={{ color: "red", margin: "0px", paddingLeft: "12px" }}>
          {errors.email?.message}
        </p>
        <StyledInput
          type={`password`}
          placeholder="비밀번호를 입력해주세요 !"
          {...register("password")}
          isValidate={!!errors.password}
        />
        <p style={{ color: "red", margin: "0px", paddingLeft: "12px" }}>
          {errors.password?.message}
        </p>
        <StyledButton disabled={!isValid}>제출</StyledButton>
        {isLoading && <StyledP>로딩 중...</StyledP>}
        {isError ? (
          <StyledP>아이디와 비밀번호를 확인하세요</StyledP>
        ) : isLogin ? (
          navigate(`/`, {
            replace: false,
          })
        ) : null}
      </StyledForm>
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

const StyledP = styled.p`
  color: white;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledH1 = styled.h1`
  color: white;
  margin-top: 100px;
`;

const StyledInput = styled.input`
  width: 300px;
  height: 30px;
  margin: 10px;
  border-radius: 8px;
  padding: 5px;
  border: 2px solid ${(props) => (props.isValidate ? "red" : "#ccc")}; /* 에러 시 빨간 테두리 */
  outline: none;
  transition: border-color 0.3s ease; /* 테두리 색상 전환 애니메이션 */
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
  /* disabled가 아닐 때만 호버 스타일 적용 */
  &:not(:disabled):hover {
    background-color: #1e6b7b;
    color: white;
  }
`;

export default LoginPage;

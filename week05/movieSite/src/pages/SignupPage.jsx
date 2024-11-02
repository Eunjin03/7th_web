import styled from "styled-components";

const SignsupPage = () => {
  return (
    <Wrapper>
      <StyledH1> 회원가입</StyledH1>
      <StyledInput type="text" placeholder="이메일을 입력해주세요 !" />
      <StyledInput type="password" placeholder="비밀번호를 입력해주세요 !" />
      <StyledInput
        type="password"
        placeholder="비밀번호를 다시 입력해주세요 !"
      />
      <StyledButton color="white" backgroundColor="#e10f57">
        제출
      </StyledButton>
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

const StyledInput = styled.input`
  width: 300px;
  height: 30px;
  margin: 10px;
  border-radius: 8px;
  padding: 5px;
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
  color: ${(props) => (props.color ? props.color : "#e10f57")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
  &:hover {
    background-color: #1e6b7b;
    color: white;
  }
`;

export default SignsupPage;

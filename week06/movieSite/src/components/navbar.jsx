import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLoginContext } from "../context/useLogin";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin, userEmail, logout } = useLoginContext();

  const handleLogout = () => {
    logout(); // 토큰 삭제 및 인증 상태 초기화
    navigate("/"); // 로그아웃 후 홈 페이지로 이동
  };

  console.log(isLogin);
  return !isLogin ? (
    <StyledNavbar>
      <Link to="/">
        <HomeButton>Yongcha</HomeButton>
      </Link>
      <FlexDiv>
        <Link to="/signup">
          <LogicButton>signup</LogicButton>
        </Link>
        <Link to="/login">
          <LogicButton color="white" backgroundColor="#e10f57">
            Login
          </LogicButton>
        </Link>
      </FlexDiv>
    </StyledNavbar>
  ) : (
    <StyledNavbar>
      <Link to="/">
        <HomeButton>Yongcha</HomeButton>
      </Link>
      <FlexDiv>
        <StyledP> {userEmail}님 반갑습니다.</StyledP>
        <StyledP onClick={handleLogout}>로그아웃</StyledP>
      </FlexDiv>
    </StyledNavbar>
  );
};

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const StyledNavbar = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #131517;
`;
const LogicButton = styled.div`
  position: relative;
  display: inline-block;
  padding: 15px 30px;
  border-radius: 15px;
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
const HomeButton = styled.div`
  padding: 15px 10px;
  position: relative;
  border: none;
  display: inline-block;
  border: none;
  color: #e10f57;
  font-size: 20px;
  font-weight: 600;
`;
const StyledP = styled.p`
  color: white;
  margin: 0;
  text-align: center;
  padding: 15px;
`;
export default Navbar;

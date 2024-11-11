import { useState, createContext, useContext } from "react";
import axios from "axios";
import useAuth from "../customHook/useAuth";

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { requestWithAuth } = useAuth();

  const initUser = async (accessToken) => {
    setLoading(true);
    try {
      // 사용자 정보 요청
      const response = await requestWithAuth(
        `${import.meta.env.VITE_BACK_API_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 백틱으로 수정
          },
        }
      );

      // 사용자 정보 설정
      setUserEmail(response.email);
      setLogin(true);
    } catch (error) {
      console.error("초기화 실패:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_API_URL}/auth/login`,
        { email: email, password: password }
      );

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setLogin(true);
      initUser(accessToken);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogin(false);
    setUserEmail("");
  };
  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setLogin,
        isLoading,
        isError,
        userEmail,
        login,
        initUser,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

// Context를 쉽게 사용할 수 있도록 커스텀 훅 정의
export const useLoginContext = () => useContext(LoginContext);

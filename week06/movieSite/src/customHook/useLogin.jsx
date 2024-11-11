import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isLogin, setLogin] = useState(false);

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
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { isLogin, isLoading, isError, login };
};

export default useLogin;

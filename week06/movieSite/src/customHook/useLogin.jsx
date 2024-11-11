import { useState, useEffect } from "react";
import axios from "axios";

// 수정 필요

const useLogin = (id, pw) => {
  const [isLogin, setLogin] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const login = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACK_API_URL}/auth/login`,
          {
            email: id,
            password: pw,
          }
        );
        setLogin(response.data.isLogin);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    login();
  }, []);

  return { isLogin, isLoading, isError };
};

export default useLogin;

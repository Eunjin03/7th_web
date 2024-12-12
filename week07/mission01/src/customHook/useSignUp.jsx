import { useState, useEffect } from "react";
import axios from "axios";

// Custom Hook 정의
const useSignUp = () => {
  const [isSignUp, setSignUp] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const signUp = async (id, pw, cpw) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_API_URL}/auth/register`,
        {
          email: id,
          password: pw,
          passwordCheck: cpw,
        }
      );
      setSignUp(true);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { isSignUp, isError, isLoading, signUp };
};

export default useSignUp;

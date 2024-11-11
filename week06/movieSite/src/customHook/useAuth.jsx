import { useState } from "react";
import axios from "axios";

const useAuth = () => {
  // 토큰이 필요한 API 요청을 처리하고, 만료된 경우 자동으로 갱신 시도
  const requestWithAuth = async (url, options = {}) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios({
        method: options.method || "GET", // 기본 메서드는 GET
        url: url,
        headers: options.headers || {}, // 전달된 headers가 없으면 빈 객체
        data: options.data || null, // POST나 PUT 요청에서 사용하는 데이터
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        // access token이 만료된 경우 refresh token을 사용하여 갱신 시도
        const refreshed = await refreshToken();
        if (refreshed) {
          return requestWithAuth(url, options); // 갱신 후 요청 재시도
        }
      }
      throw error;
    }
  };
  // refresh token을 사용해 새로운 access token을 요청
  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedRefreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return false;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/token/access",
        {},
        {
          headers: {
            Authorization: `Bearer ${storedRefreshToken}`,
          },
        }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // 새로운 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }
      return true;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return false;
    }
  };

  return { requestWithAuth };
};

export default useAuth;

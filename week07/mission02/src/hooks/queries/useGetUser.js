import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("No access token found");
  }

  const { data } = await axios.get(
    `${import.meta.env.VITE_BACK_API_URL}/user/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data; // 서버에서 사용자 정보 반환 (예: { email: "user@example.com" })
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"], // "user"라는 키로 데이터를 캐싱
    queryFn: fetchUser, // 데이터를 가져오는 함수
    retry: false, // 실패 시 재시도하지 않음
  });
};

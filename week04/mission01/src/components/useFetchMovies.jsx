import { useState, useEffect } from "react";
import axios from "axios";

// Custom Hook
const useFetchMovies = (requestAdr) => {
  const [movies, setMovies] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true); // API 호출 전에 로딩 상태 true로 변경
      try {
        const response = await axios.get(
          import.meta.env.VITE_MOVIE_API_URL + requestAdr,
          {
            headers: {
              Authorization: "Bearer ${import.meta.env.VITE_TMDB_TOKEN}",
            },
          }
        );
        setMovies(response.data.results); // 데이터를 상태에 저장
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false); // API 호출 후에 로딩 상태 false로 변경
      }
    };
    if (requestAdr) {
      getMovies(); // requestAdr가 유효할 때만 API 호출
    }
  }, [requestAdr]); // 의존성 배열에 requestAdr 추가

  return { movies, isLoading, isError }; // API 데이터를 리턴
};

export default useFetchMovies;

import axios from "axios";

// 네이밍 수정: React 훅과 구분하기 위해 `getMovies`로 변경
const getMovies = async ({ category, pageParam }) => {
  const { data } = await axios.get(
    import.meta.env.VITE_MOVIE_API_URL +
      `/movie/${category}?language=ko-KR&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, // 백틱으로 수정
      },
    }
  );

  console.log("영화 받아오는 중,,,,,");

  return data;
};

export { getMovies };

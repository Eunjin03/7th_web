import axios from "axios";

const getMovieDetail = async ({ requestAdr }) => {
  const data = await axios.get(
    import.meta.env.VITE_MOVIE_API_URL + requestAdr,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, // 백틱으로 수정
      },
    }
  );

  console.log(`${requestAdr} 영화 데이터 받아오는 중,,,,,`);

  return data;
};

export { getMovieDetail };

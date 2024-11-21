import axios from "axios";
import { useEffect, useState } from "react";

const useSearchMovie = (requestAdr) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_MOVIE_API_URL
          }/search/movie?query=${requestAdr}&include_adult=true&language=ko-KR&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        console.log(response.data.results);
        if (response.data.results.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (requestAdr) {
      fetchMovies();
    }
  }, [requestAdr]);

  return { movies, isLoading, isError };
};

export default useSearchMovie;

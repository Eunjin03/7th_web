import styled from "styled-components";
import * as S from "../components/card.styled.jsx";
import Card from "../components/movies.jsx";
import useFetchMovies from "../hooks/useFetchMovies.jsx";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../hooks/queries/useGetMovies.js";
import SkeletonElement from "../components/skeleton.jsx";
import { useGetInfiniteMovies } from "../../../mission02/src/hooks/queries/useGetInfiniteMovies.js";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

const MoviePage = () => {
  const {
    data: movies,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteMovies("popular");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <Wrapper>
        <SkeletonElement />
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper>
        <p style={{ color: "white" }}>Error fetching movie details.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <S.MovieList>
        {movies?.pages.map((page, index) => {
          return page.results.map((movie) => (
            <S.MovieContainer key={movie.id}>
              <Card movie={movie} />
              <S.MovieDetails>
                <StyledP fontWeight={600}>{movie.title}</StyledP>
                <StyledP fontSize="8px">{movie.release_date}</StyledP>
              </S.MovieDetails>
            </S.MovieContainer>
          ));
        })}
      </S.MovieList>
      <div ref={ref} style={{ display: "flex", justifyContent: "center" }}>
        {isFetching && <TailSpin color={"#ffffff"} />}
      </div>
    </Wrapper>
  );
};

const StyledP = styled.p`
  color: white;
  margin: 0;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "10px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
  justify-content: left;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;
const Wrapper = styled.div`
  background-color: #000000;
  width: 100vw;
  min-height: 100vh; /* 화면 크기에 맞게 최소 높이만 적용 */
  padding: 20px;
`;

export default MoviePage;

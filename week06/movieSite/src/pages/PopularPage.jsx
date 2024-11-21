import styled from "styled-components";
import * as S from "../components/card.styled.jsx";
import Card from "../components/movies.jsx";
import useFetchMovies from "../customHook/useFetchMovies.jsx";

const PopularPage = () => {
  const { movies, isLoading, isError } = useFetchMovies(
    "/movie/popular?language=ko-KR&page=1"
  );

  if (isLoading) {
    return (
      <Wrapper>
        <p style={{ color: "white" }}>Loading...</p>
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
        {movies.map((movie) => (
          <S.MovieContainer key={movie.id}>
            <Card movie={movie} />
            <S.MovieDetails>
              <StyledP fontWeight={600}>{movie.title}</StyledP>
              <StyledP fontSize="8px">{movie.release_date}</StyledP>
            </S.MovieDetails>
          </S.MovieContainer>
        ))}
      </S.MovieList>
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

export default PopularPage;

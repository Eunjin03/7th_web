import styled from "styled-components";
import Card from "../components/movies.jsx";
import useFetchMovies from "../components/useFetchMovies.jsx";
const UpcomingPage = () => {
  const { movies, isLoading, isError } = useFetchMovies(
    "/movie/upcoming?language=ko-KR&page=1"
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
      <MovieList>
        {movies.map((movie) => (
          <MovieContainer key={movie.id}>
            <Card movie={movie} />
            <MovieDetails>
              <StyledP fontWeight={600}>{movie.title}</StyledP>
              <StyledP fontSize="8px">{movie.release_date}</StyledP>
            </MovieDetails>
          </MovieContainer>
        ))}
      </MovieList>
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

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 그리드 아이템의 너비를 그리드 칸에 맞춤 */
`;

const MovieDetails = styled.div`
  width: 6rem;
  margin-top: 10px;
  text-align: center;
  color: white; /* 텍스트가 검은 배경에 보이도록 흰색 설정 */
`;

const MovieList = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(10, 1fr);
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default UpcomingPage;

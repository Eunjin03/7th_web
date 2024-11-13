import styled from "styled-components";
import useDebounce from "../customHook/useDebounce";
import { useState, useEffect } from "react";
import useSearchMovie from "../customHook/useSearchMovie";
import Card from "../components/movies.jsx";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { movies, isLoading, isError } = useSearchMovie(debouncedSearchTerm);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("검색어: ", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <Wrapper>
      <StyledDiv>
        <StyledInput
          type="text"
          placeholder="영화 제목을 입력해주세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton>검색</StyledButton>
      </StyledDiv>
      {isLoading ? (
        <ErrorP>Loading...</ErrorP>
      ) : isError ? (
        <ErrorP>
          해당하는 검색어 {searchTerm}에 해당하는 데이터가 없습니다{" "}
        </ErrorP>
      ) : (
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
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #000000;
  width: 100vw;
  height: 100vh;
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 5px 30px;
  height: 50px;
  font-family: "paybooc-Light", sans-serif;
  text-decoration: none;
  margin-top: 20px;
  background-color: #e10f57;
  color: white;
  border: none;
  border-radius: 0px 10px 10px 0px;
`;
const ErrorP = styled.p`
  color: white;
  margin: 20px;
  text-align: center;
`;
const StyledInput = styled.input`
  width: 85%;
  padding: 15px;
  border: none;
  display: inline-block;
  margin-top: 20px;
  border-radius: 10px 0px 0px 10px;
`;

const MovieList = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(10, 1fr);
  width: 100%;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;

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

export default SearchPage;

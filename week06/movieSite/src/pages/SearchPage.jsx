import styled from "styled-components";
import useDebounce from "../customHook/useDebounce";
import { useState, useEffect } from "react";
import useSearchMovie from "../customHook/useSearchMovie";
import Card from "../components/movies.jsx";
import * as S from "../components/card.styled.jsx";
import SkeletonElement from "../components/skeleton.jsx";
import { MovieList as BaseMovieList } from "../components/card.styled.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { movies, isLoading, isError } = useSearchMovie(debouncedSearchTerm);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams({
    mq: "",
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("검색어: ", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const mq = searchParam.get("mq");

  const handleSearch = () => {
    if (mq === searchTerm) return;

    navigate(`/search?mq=${searchTerm}`);
    console.log("검색됨");
  };

  return (
    <Wrapper>
      <StyledDiv>
        <StyledInput
          type="text"
          placeholder="영화 제목을 입력해주세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledButton onClick={handleSearch}>검색</StyledButton>
      </StyledDiv>
      {isLoading ? (
        <MovieListStyled>
          <SkeletonElement />
        </MovieListStyled>
      ) : isError || movies.length === 0 ? (
        <ErrorP>
          해당하는 검색어 {debouncedSearchTerm}에 대한 데이터가 없습니다.
        </ErrorP>
      ) : (
        <MovieListStyled>
          {movies.map((movie) => (
            <S.MovieContainer key={movie.id}>
              <Card movie={movie} />
              <S.MovieDetails>
                <StyledP fontWeight={600}>{movie.title}</StyledP>
                <StyledP fontSize="8px">{movie.release_date}</StyledP>
              </S.MovieDetails>
            </S.MovieContainer>
          ))}
        </MovieListStyled>
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

const MovieListStyled = styled(BaseMovieList)`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 40px);
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

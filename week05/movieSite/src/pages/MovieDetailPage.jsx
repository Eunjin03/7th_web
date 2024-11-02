import { useParams } from "react-router-dom";
import styled from "styled-components";

import useMovieDetail from "../components/useMovieDetail.jsx";
import useMovieCredits from "../components/useMovieCredits.jsx";
import Cast from "../components/profile.jsx";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  // 영화 데이터를 API에서 가져옴
  const { movies, isLoading, isError } = useMovieDetail(
    `/movie/${movieId}?language=ko-KR`
  );
  const { casts, isLoadingCast, isErrorCast } = useMovieCredits(
    `/movie/${movieId}/credits?language=ko-KR`
  );

  if (isLoading || isLoadingCast) {
    return (
      <Wrapper>
        <p style={{ color: "white" }}>Loading...</p>
      </Wrapper>
    );
  }

  if (isError || isErrorCast) {
    return (
      <Wrapper>
        <p style={{ color: "white" }}>Error fetching movie details.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <MoviePoster
        bgImage={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
      >
        <Overlay>
          <MovieDetails>
            <h1>{movies.title}</h1>
            <p style={{ fontSize: "13px" }}>
              개봉일: {movies.release_date}
              <br />
              평점: {movies.vote_average}
              <br />
              장르:{" "}
              {movies.genres && movies.genres.length > 0
                ? movies.genres.map((genre) => genre.name).join(", ")
                : "정보 없음"}
              <br />
              런타임: {movies.runtime}분
            </p>
            <p style={{ fontSize: "15px" }}>{movies.overview}</p>
          </MovieDetails>
        </Overlay>
      </MoviePoster>
      <hr style={{ margin: "20px 0", border: "1px solid #333" }} />
      <h1>감독/출연</h1>
      <CastList>
        {casts && casts.length > 0 ? (
          casts.map((cast) => (
            <CastDiv>
              <Cast key={cast.id} profile={cast} />
              <StyledP fontWeight={600}>{cast.name}</StyledP>
              <StyledP fontSize="8px">{cast.character}</StyledP>
            </CastDiv>
          ))
        ) : (
          <p style={{ color: "white" }}>출연진 정보가 없습니다.</p>
        )}
      </CastList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #000000;
  width: 100vw;
  min-height: 100vh; /* 화면 크기에 맞게 최소 높이만 적용 */
  padding: 20px;
  h1 {
    color: white;
  }
`;

const StyledP = styled.p`
  color: white;
  margin: 1px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "10px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 300)};
  justify-content: left;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const MoviePoster = styled.div`
  position: relative;
  width: 100%;
  height: 300px; /* 원하는 높이로 설정 */
  background-image: url(${(props) => props.bgImage}); /* 배경 이미지 경로 */
  background-size: cover;
  background-position: center;
  border-radius: 10px; /* 테두리 둥글게 */
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.1)
  );
  display: flex;
  align-items: center;
  padding: 0 20px 0 0;
  box-sizing: border-box;
  border-radius: 10px;
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  color: white;
  text-align: start;
  h1 {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
`;

const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;
const CastDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;
export default MovieDetailPage;

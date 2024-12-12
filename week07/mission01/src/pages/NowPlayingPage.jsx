import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../hooks/queries/useGetMovies";
import styled from "styled-components";
import * as S from "../components/card.styled.jsx";
import Card from "../components/movies.jsx";
import SkeletonElement from "../components/skeleton.jsx";

const NowPlayingPage = () => {
  // React Query를 사용한 비동기 데이터 호출
  const { data, isPending, isError } = useQuery({
    queryKey: ["movies", "now_playing"],
    queryFn: () => getMovies({ category: "now_playing", pageParam: 1 }),
    cacheTime: 10000,
    staleTime: 10000, // 백엔드에 무분별한 요청을 보내지 않기 위해 캐시된 데이터를 사용
  });

  // data.results가 실제 영화 리스트
  const movies = data?.results || [];

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

export default NowPlayingPage;

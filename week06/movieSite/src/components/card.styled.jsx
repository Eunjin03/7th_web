import styled from "styled-components";

export const MovieList = styled.div`
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

export const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 그리드 아이템의 너비를 그리드 칸에 맞춤 */
`;

export const MovieDetails = styled.div`
  width: 6rem;
  margin-top: 10px;
  text-align: center;
  color: white; /* 텍스트가 검은 배경에 보이도록 흰색 설정 */
`;

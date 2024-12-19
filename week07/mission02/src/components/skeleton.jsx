import React from "react";
import styled, { keyframes } from "styled-components";
import * as S from "../components/card.styled.jsx";
import { MovieList as BaseMovieList } from "../components/card.styled.jsx";

const SkeletonElement = () => {
  return (
    <MovieListStyled>
      {Array.from({ length: 20 }).map((_, index) => (
        <SkeletonCard key={index}>
          <SkeletonImage />
          <SkeletonDetails>
            <SkeletonText width="70%" />
            <SkeletonText width="50%" />
          </SkeletonDetails>
        </SkeletonCard>
      ))}
    </MovieListStyled>
  );
};

// 스켈레톤 애니메이션 정의
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const MovieListStyled = styled(BaseMovieList)`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 40px);
`;

// 스켈레톤 카드 컨테이너
const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%; /* MovieList의 칸에 맞춤 */
`;

// 스켈레톤 이미지 (영화 포스터 자리)
const SkeletonImage = styled.div`
  width: 100px;
  height: 150px;
  background: #ddd;
  border-radius: 5px;
  background: linear-gradient(90deg, #ddd 25%, #eee 50%, #ddd 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

// 스켈레톤 텍스트
const SkeletonText = styled.div`
  width: ${(props) => props.width || "100%"};
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  background: linear-gradient(90deg, #ddd 25%, #eee 50%, #ddd 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

// 스켈레톤 텍스트 컨테이너
const SkeletonDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 80%;
`;

export default SkeletonElement;

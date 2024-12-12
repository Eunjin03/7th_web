import styled from "styled-components";

const Profile = ({ profile }) => {
  return (
    <StyledButton>
      <Image
        src={`https://image.tmdb.org/t/p/w500${profile.profile_path}`}
        alt={profile.name}
      />
    </StyledButton>
  );
};

export default Profile;

// styled-components로 버튼을 정의
const StyledButton = styled.div`
  width: 80px;
  height: 80px;
  margin: 5px;
`;
const Image = styled.img`
  src: ${(props) => props.src};
  alt: ${(props) => props.alt};
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

import React from "react";
import { ProfileComponent } from "../components/Profile/index";
import styled from "styled-components";

const ProfilePage = () => {
  return (
    <ProfileContainer>
      <ProfileComponent isMyProfile={true} userId={null} />
    </ProfileContainer>
  );
};

export default ProfilePage;
export const ProfileContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

import React, { useCallback, useState } from "react";
import styled from "styled-components";
import FileUpload from "../../pages/upload-avatar";
import axios from "axios";
import { Button, Card } from "@material-ui/core";
import { StyledButton } from "../Registration/styled";

export const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [changeAvatar, setChangeAvatar] = useState(false);
  const getUserInfo = useCallback(async () => {
    const { data } = await axios.get("/api/getUserInfo");
    setProfileInfo(data.userInfo[0]);
    console.log(data.userInfo[0]);
  }, []);

  const handleChangeAvatar = useCallback(() => {
    setChangeAvatar(changeAvatar => !changeAvatar);
  }, []);
  return (
    <ProfileContainer>
      <Title>Информация о профиле</Title>
      {/*<Card>*/}
      <CardContent>
        <Info>
          <Text>email: {profileInfo.email}</Text>
          <Text>login: {profileInfo.login}</Text>
          <Text>password: {profileInfo.password}</Text>
          <Text> firstName: {profileInfo.firstName}</Text>
          <Text> _id: {profileInfo._id}</Text>
          <img
            width="100px"
            src={`http://localhost:3000/api/files/${profileInfo.avatar}`}
            alt="Avatar"
          />
        </Info>

        <StyledButton color="primary" variant="contained" onClick={getUserInfo}>
          Получить информацию по данному профилю
        </StyledButton>
        <Button
          color="primary"
          variant="contained"
          onClick={handleChangeAvatar}
        >
          Сменить Аватар
        </Button>
        {changeAvatar && <FileUpload />}
      </CardContent>
      {/*</Card>*/}
    </ProfileContainer>
  );
};

const Title = styled.div`
  font-size: 24px;
  color: white;
  margin-top: -180px;
  margin-bottom: 20px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Text = styled.div``;
const ProfileContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2d343c;
`;
const CardContent = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button, Card } from "@material-ui/core";
import FileUpload from "../../pages/upload";
import { useRouter } from "next/router";

export const ProfileComponent = ({ isMyProfile, userId,closeModal }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const router = useRouter();
  const getUserInfo = useCallback(async () => {
    if (isMyProfile) {
      const { data } = await axios.get(`/api/getUserInfo/99663300`);
      setProfileInfo(data.userInfo[0]);
    } else {
      const { data } = await axios.get(`/api/getUserInfo/${userId}`);
      setProfileInfo(data.userInfo[0]);
    }
  }, [isMyProfile, userId]);

  const handleChangeAvatar = useCallback(() => {
    setChangeAvatar(changeAvatar => !changeAvatar);
  }, []);

  const closeModalDialog = () => {
    if (isMyProfile) {
      router.replace("/");
    }else{
      closeModal()
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [isMyProfile, userId]);
  return (
    <SCard>
      <Title>Информация о профиле</Title>
      <CardContent>
        {profileInfo ? (
          <>
            <img
              style={{ margin: 20 }}
              width="200px"
              src={`http://localhost:3000/api/files/${profileInfo.avatar}`}
              alt="Avatar"
            />
            <Info>
              <Text>email: {profileInfo.email}</Text>
              <Text>login: {profileInfo.login}</Text>
              <Text> firstName: {profileInfo.firstName}</Text>
              <Text> _id: {profileInfo._id}</Text>
            </Info>
            <Button
              color="primary"
              variant="contained"
              onClick={handleChangeAvatar}
            >
              Сменить Аватар
            </Button>
            <Button color="primary" variant="contained" onClick={closeModalDialog}>
              Закрыть окно
            </Button>
            {changeAvatar && <FileUpload getUserInfo={getUserInfo} />}
          </>
        ) : (
          "Отсутствует информация о профиле"
        )}
      </CardContent>
    </SCard>
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
const Text = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const SCard = styled(Card)`
  width: 700px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

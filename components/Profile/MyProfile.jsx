import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import FileUpload from "../../pages/upload";
import { AccountCircle } from "@material-ui/icons";

export const MyProfile = ({ userId }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [profileInfo, setProfileInfo] = useState(null);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const getUserInfo = useCallback(async () => {
    const { data } = await axios.get(`/api/getUserInfo/${userId}`);
    setProfileInfo(data.userInfo[0]);
  }, [userId]);

  const handleChangeAvatar = useCallback(() => {
    setChangeAvatar(changeAvatar => !changeAvatar);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [userId]);
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <AccountCircle color="primary" />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Информация о профиле
        </DialogTitle>
        <DialogContent dividers>
          {profileInfo ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                style={{ margin: 20 }}
                width="200px"
                src={`http://localhost:3000/api/files/${profileInfo.avatar}`}
                alt="Avatar"
              />
              <Info>
                <Text>Почта: {profileInfo.email}</Text>
                <Text>Логин: {profileInfo.login}</Text>
                <Text> Имя: {profileInfo.firstName}</Text>
                <Text> ID Пользователя: {profileInfo._id}</Text>
              </Info>
              <>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleChangeAvatar}
                >
                  Сменить Аватар
                </Button>

                {changeAvatar && <FileUpload getUserInfo={getUserInfo} />}
              </>
            </div>
          ) : (
            "Отсутствует информация о профиле"
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const Text = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

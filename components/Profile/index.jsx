import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog
} from "@material-ui/core";
import { UserContext } from "../../context/user";
import { DialogsContext } from "../../context/listDialogs";
import { useRouter } from "next/router";
import Moment from "react-moment";
import moment from "moment";

export const MemberDialogProfile = () => {
  const router = useRouter();

  const { dialogs } = useContext(DialogsContext);
  const dialog = dialogs.find(dialog => dialog._id === router.query.id);
  const { userId } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [profileInfo, setProfileInfo] = useState(null);
  const getUserInfo = useCallback(async () => {
    const notMeUserObject = dialog.users.find(e => userId !== e.userId);
    const {
      data: { userInfo }
    } = await axios.get(`/api/getUserInfo/${notMeUserObject.userId}`);
    setProfileInfo(userInfo[0]);
  }, [dialog]);

  useEffect(() => {
    if (dialog) {
      getUserInfo();
    }
  }, [dialog]);

  const dateConverter = lastTimeOnline => {
    const date = moment(lastTimeOnline)
      .lang("ru")
      .startOf()
      .fromNow();
    return date;
  };

  return (
    <>
      <Profile onClick={handleClickOpen}>
        <UserName>{dialog?.name}</UserName>
        <LastOnline>
          <>был(а) в сети {dateConverter(profileInfo?.lastTimeOnline)}</>
        </LastOnline>
      </Profile>
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
            <>
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
            </>
          ) : (
            "Отсутствует информация о профиле"
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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
const Profile = styled.div`
  display: flex;
  margin-left: 15px;
  flex-direction: column;
  justify-content: space-around;
`;
const UserName = styled.div`
  color: white;
  font-size: 16px;
`;
const LastOnline = styled.div`
  color: grey;
  margin-right: 10px;
  font-size: 14px;
`;

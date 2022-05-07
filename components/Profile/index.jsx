import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { Dialog } from "../ListOfDialogs/Dialog/Dialog";
import { UserContext } from "../../context/user";
import { DialogsContext } from "../../context/listDialogs";
import { useRouter } from "next/router";

export const MemberDialogProfile = () => {
  const router = useRouter();

  const { dialogs } = useContext(DialogsContext);
  const dialog = dialogs.find(dialog => dialog._id === router.query.id);
  const { userId } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  console.log(dialog, open, "dialog");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [profileInfo, setProfileInfo] = useState(null);
  const getUserInfo = useCallback(async () => {
    console.log(2);
    if (!dialog) {
      return;
    } else {
      const notMeUserObject = dialog.users.find(e => userId !== e.userId);
      console.log(notMeUserObject, "notMeUserObject");
      const { data } = await axios.get(
        `/api/getUserInfo/${notMeUserObject.userId}`
      );
      setProfileInfo(data.userInfo[0]);
    }
  }, [dialog]);

  useEffect(() => {
    console.log(1, dialog);
    if (dialog) {
      getUserInfo();
    } else {
      return;
    }
  }, [dialog]);
  return (
    <>
      <Button onClick={handleClickOpen}>123312132</Button>
      <Profile onClick={handleClickOpen}>
        <UserName>{dialog?.name}</UserName>
        <LastOnline>недавно</LastOnline>
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
                <Text>email: {profileInfo.email}</Text>
                <Text>login: {profileInfo.login}</Text>
                <Text> firstName: {profileInfo.firstName}</Text>
                <Text> _id: {profileInfo._id}</Text>
              </Info>
              )}
            </>
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
  align-items: center;
  justify-content: center;
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

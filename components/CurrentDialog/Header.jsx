import React, { memo, useContext, useState } from "react";
import { IconButton } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";
import { DialogsContext } from "../../context/listDialogs";
import { useRouter } from "next/router";
import { UserContext } from "../../context/user";
import { ProfileComponent } from "../Profile";
import { ProfileContainer } from "../../pages/profile";

export const Header = memo(() => {
  const router = useRouter();
  const { dialogs } = useContext(DialogsContext);
  const { userId } = useContext(UserContext);
  const dialog = dialogs.find(dialog => dialog._id === router.query.id);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [dialogUserId, setDialogUserId] = useState(null);
  const openUserDialog = () => {
    console.log(userId, "userId");
    console.log(dialog, "dialog");
    const notMeUserObject = dialog.users.find(e => userId !== e.userId);
    console.log(notMeUserObject.userId, "notMeUser");

    setIsUserModalOpen(notMeUserObject.userId);
    setDialogUserId(notMeUserObject.userId);
  };
  const closeModal = () => {
    setIsUserModalOpen(false);
    setDialogUserId(null);
  };
  return (
    <NavBar>
      <Profile onClick={openUserDialog}>
        <UserName>{dialog.name}</UserName>
        <LastOnline>недавно</LastOnline>
      </Profile>
      {isUserModalOpen && (
        <ProfileContainer style={{ background: "transparent" }}>
          <ProfileComponent userId={dialogUserId} closeModal={closeModal} />
        </ProfileContainer>
      )}

      <NavBarIcons>
        <IconButton>
          <CallIcon />
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </NavBarIcons>
    </NavBar>
  );
});

const NavBar = styled.div`
  height: 48px;
  background: #17212b;
  display: flex;
  justify-content: space-between;
`;
const Profile = styled.div`
  display: flex;
  margin-left: 15px;
  flex-direction: column;
  justify-content: space-around;
`;
const NavBarIcons = styled.div``;
const UserName = styled.div`
  color: white;
  font-size: 16px;
`;
const LastOnline = styled.div`
  color: grey;
  margin-right: 10px;
  font-size: 14px;
`;

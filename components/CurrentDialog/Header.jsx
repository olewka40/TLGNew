import React, { memo, useContext } from "react";
import { IconButton } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";
import { DialogsContext } from "../../context/listDialogs";
import { useRouter } from "next/router";

export const Header = memo(() => {
  const router = useRouter();
  const { dialogs } = useContext(DialogsContext);
  const dialog = dialogs.find(dialog => dialog._id === router.query.id);

  return (
    <NavBar>
      <Profile>
        <UserName>{dialog.name}</UserName>
        <LastOnline>недавно</LastOnline>
      </Profile>
      <NavBarIcons>
        <IconButton>
          <CallIcon color="" />
        </IconButton>
        <IconButton>
          <SearchIcon color="" />
        </IconButton>
        <IconButton>
          <MoreVertIcon color="" />
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

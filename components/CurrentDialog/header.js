import { IconButton } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import styled from "styled-components";
import { DialogsContext } from "../../context/listDialogs";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  return (
    <DialogsContext.Consumer>
      {({ dialogs }) => {
        const dialog = dialogs.find(dialog => dialog._id === router.query.id);
        return (
          <NavBar>
            <Profile>
              <UserName>{dialog.name}</UserName>
              <LastOnline>вчера в 18:24</LastOnline>
            </Profile>
            <NavBarIcons>
              <IconButton>
                <CallIcon style={{ color: "#6b757f" }} />
              </IconButton>
              <IconButton>
                <SearchIcon style={{ color: "#6b757f" }} />
              </IconButton>
              <IconButton>
                <MoreVertIcon style={{ color: "#6b757f" }} />
              </IconButton>
            </NavBarIcons>
          </NavBar>
        );
      }}
    </DialogsContext.Consumer>
  );
};

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

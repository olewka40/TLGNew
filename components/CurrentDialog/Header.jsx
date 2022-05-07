import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";
import { MemberDialogProfile } from "../Profile";
export const Header = memo(() => {
  return (
    <NavBar>
      <MemberDialogProfile />
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

const NavBarIcons = styled.div``;

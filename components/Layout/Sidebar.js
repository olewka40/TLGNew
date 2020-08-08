import React, { useCallback, useState, memo } from "react";
import styled, { css } from "styled-components";
import { IconButton } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Menu } from "@material-ui/icons";
import { useRouter } from "next/router";
import axios from "axios";
import ListOfDialogs from "../ListOfDialogs";

export const Sidebar = memo(() => {
  const [opened, setOpen] = useState(true);
  const router = useRouter();
  const logout = useCallback(async () => {
    await axios.get("/api/authorization/logout");
    router.replace("/login");
  }, []);

  return (
    <StyledSidebar opened={opened}>
      <Header>
        <StyledToolbar>
          <IconButton
            style={{ color: "#6b757f" }}
            aria-label="menu"
            onClick={() => {
              setOpen(!opened);
            }}
          >
            <Menu />
          </IconButton>
          <OpenHidden opened={opened}>
            <SearchInput placeholder="  Найти..." />
          </OpenHidden>

          <IconButton
            onClick={() => {
              router.push("/locked");
            }}
          >
            <OpenHidden opened={opened}>
              <LockOpenIcon style={{ color: "#6b757f" }} />
            </OpenHidden>
          </IconButton>
        </StyledToolbar>
      </Header>
      <Main>
        <ListOfDialogs opened={opened} />
      </Main>
      <Footer>
        <ExitToAppIcon color="primary" fontSize="large" onClick={logout} />
      </Footer>
    </StyledSidebar>
  );
});

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: ${p => (p.opened ? 400 : 60)}px;
  height: 100%;
  background: #17212b;
  transition: 0.3s;
  border-right: 1px solid black;
`;
const Header = styled.div`
  background: #17212b;
  display: flex;
  justify-content: flex-start;
`;
export const OpenHidden = styled.div`
  ${p =>
    !p.opened &&
    css`{
display: none;
`}
`;
const Main = styled.div`
  height: 95vh;
  overflow-y: auto;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  background: #17212b;
  min-height: 50px;
`;
const StyledToolbar = styled.div`
  display: flex;
  padding-left: 5px;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  margin-top: 10px;
  border: 0;
  background-color: #232f3d;
  color: white;
`;

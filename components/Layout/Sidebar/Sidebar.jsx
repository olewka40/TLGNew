import React, { useCallback, useState, memo } from "react";
import { IconButton } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Menu } from "@material-ui/icons";
import { useRouter } from "next/router";
import axios from "axios";
import ListOfDialogs from "../../ListOfDialogs";
import {
  StyledSidebar,
  SearchInput,
  StyledToolbar,
  Header,
  OpenHidden,
  Footer,
  Main
} from "./styled";

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
            color="primary"
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
              <LockOpenIcon color="primary" />
            </OpenHidden>
          </IconButton>
        </StyledToolbar>
      </Header>
      <Main>
        <ListOfDialogs opened={opened} />
      </Main>
      <Footer>
        <IconButton size="medium">
          <ExitToAppIcon color="primary" fontSize="large" onClick={logout} />
        </IconButton>
      </Footer>
    </StyledSidebar>
  );
});

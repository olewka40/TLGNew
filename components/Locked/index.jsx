import React, { useCallback, memo } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  Container,
  LockedForm,
  StyledText,
  StyledInput,
  StyledLink,
  StyledButton
} from "./styled";

export const Locked = memo(() => {
  const router = useRouter();

  const logout = useCallback(async () => {
    await axios.get("/logout");
    router.replace("/login");
  }, []);
  return (
    <Container>
      <LockedForm>
        <StyledText>Введите код-пароль</StyledText>
        <StyledInput>
          <TextField
            style={{ height: 60, width: 215 }}
            id="outlined-basic"
            label="Код доступа"
            variant="outlined"
            color="#2f6ea4"
          />
        </StyledInput>
        <StyledButton>
          <Button
            style={{ width: 215, height: 60 }}
            variant="contained"
            size="large"
            color="primary"
          >
            ПОДТВЕРДИТЬ
          </Button>
        </StyledButton>
        <StyledLink href="/login" onClick={logout}>
          Выйти
        </StyledLink>
      </LockedForm>
    </Container>
  );
});

export default Locked;

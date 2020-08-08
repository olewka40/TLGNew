import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { Button, TextField, Link } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";

export const Locked = memo(() => {
  const router = useRouter();

  const logout = useCallback(async () => {
    await axios.get("/api/authorization/logout");
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

const Container = styled.div`
  background-color: #0e1621;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledText = styled.div`
  color: #e6f3fb;
  margin-bottom: 20px;
  font-size: 20px;
`;
const StyledInput = styled.div`
  margin: 5px;
`;
const StyledButton = styled.div`
  margin: 5px;
`;
const StyledLink = styled(Link)`
  margin: 5px;
  color: #0074c6;
  :visited {
    color: #0074c6;
  }
  :link {
    color: #0074c6;
  }
`;
const LockedForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

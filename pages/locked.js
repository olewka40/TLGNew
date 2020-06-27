import React, { Component, useCallback } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useRouter } from "next/router";

export const Locked = () => {
  const router = useRouter();

  const logout = useCallback(async () => {
    await axios.get("/api/authorization/logout");
    router.replace("/login");
  }, []);
  return (
    <Container>
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
      <StyledA href="" onClick={logout}>
        Выйти
      </StyledA>
    </Container>
  );
};

export default Locked;

const Container = styled.div`
  background-color: #0e1621;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const StyledText = styled.div`
  color: #e6f3fb;
  margin-bottom: 50px;
  margin-top: -225px;
  font-size: 20px;
`;
const StyledInput = styled.div`
  margin: 5px;
`;
const StyledButton = styled.div`
  margin: 5px;
`;
const StyledA = styled.a`
  margin: 5px;

  color: #303f9f;
`;

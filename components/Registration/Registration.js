import React, { useCallback, useState, memo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Avatar, TextField, Grid } from "@material-ui/core";
import {
  Container,
  RegistrationForm,
  Title,
  StyledButton,
  StyledLink
} from "./styled";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Head from "next/head";
import { checkEmail, checkPass } from "./validators";

export const Registration = memo(() => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();
  const tryReg = useCallback(async () => {
    if (!login || !firstName || !lastName) {
      alert("Не все поля заполнены");
      return;
    }
    if (!checkPass(password)) {
      alert(
        "Пароль должен содержать строчные и прописные буквы, а также содержать от 6 до 20 символов."
      );
      return;
    }
    if (!checkEmail(email)) {
      alert(
        "Введите действующую почту в соответствии с форматом mail@domen.com"
      );
      return;
    }
    const { data } = await axios.post(`api/registration`, {
      login,
      password,
      firstName,
      lastName,
      email
    });
    router.replace("/login");
  });

  return (
    <Container>
      <Head>
        <title>Регистрация</title>
      </Head>
      <RegistrationForm>
        <Avatar>
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Title>Регистрация</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="Имя"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="Имя"
              autoFocus
              onChange={({ target: { value: value } }) => {
                setFirstName(value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Фамилия"
              name="lastName"
              autoComplete="lname"
              onChange={({ target: { value: value } }) => {
                setLastName(value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="login"
              label="Имя пользователя"
              name="login"
              autoComplete="login"
              onChange={({ target: { value: value } }) => {
                setLogin(value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={({ target: { value: value } }) => {
                setPassword(value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Электронная почта"
              name="email"
              autoComplete="email"
              onChange={({ target: { value: value } }) => {
                setEmail(value);
              }}
            />
          </Grid>
        </Grid>
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={tryReg}
        >
          Зарегистрироваться
        </StyledButton>

        <StyledLink href="/login" variant="body2">
          Есть аккаунт? Войдите
        </StyledLink>
      </RegistrationForm>
    </Container>
  );
});

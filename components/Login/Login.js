import React, { useCallback, memo, useState } from "react";
import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useRouter } from "next/router";
import {
  StyledButton,
  StyledLink,
  Title,
  Container
} from "../Registration/styled";
import { LoginForm, Links, FormFooter } from "./styled";

const defaultRemember = () => {
  if (process.browser) {
    return localStorage.getItem("rememberMe") || false;
  } else {
    return false;
  }
};
const defaultLogin = () => {
  if (process.browser) {
    return localStorage.getItem("rememberMeLogin") || "";
  } else {
    return "";
  }
};

export const Login = (callback, deps) => {
  const [login, setLogin] = useState(defaultLogin);
  const [password, setPassword] = useState("");
  const [rememberMe, setRemember] = useState(defaultRemember);
  const router = useRouter();
  const tryAuth = useCallback(async () => {
    const { data } = await axios.get(`api/authorization/${login}/${password}`);
    if (data && data.status === 200) {
      localStorage.setItem("rememberMe", rememberMe);
      if (!rememberMe) {
        localStorage.setItem("rememberMeLogin", "");
      } else {
        localStorage.setItem("rememberMeLogin", login);
      }
      router.replace("/");
    }
  });

  return (
    <Container>
      <LoginForm>
        <Avatar>
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Title>Добро пожаловать!</Title>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={login}
            onChange={({ target: { value: value } }) => {
              setLogin(value);
            }}
            id="login"
            label="Логин"
            name="Login"
            autoComplete="Login"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={({ target: { value: value } }) => {
              setPassword(value);
            }}
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                checked={rememberMe}
                onClick={() => setRemember(!rememberMe)}
                color="primary"
              />
            }
            label="Запомнить меня"
          />
          <FormFooter>
            <StyledButton
              onClick={tryAuth}
              fullWidth
              variant="contained"
              color="primary"
            >
              Войти
            </StyledButton>
            <Links>
              <StyledLink href="/forgot" variant="body2">
                Забыли пароль?
              </StyledLink>
              <StyledLink href="registration" variant="body2">
                Нет аккаунта? Зарегистрируйтесь
              </StyledLink>
            </Links>
          </FormFooter>
        </form>
      </LoginForm>
    </Container>
  );
};
export default Login;

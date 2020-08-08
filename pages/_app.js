import App from "next/app";
import React from "react";
import { createGlobalStyle } from "styled-components";
import { withRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import "./emoji-mart.css";
import "./scroll.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles/";

axios.defaults.baseURL = "http://localhost:3000/";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0074C6"
    },
    secondary: {
      main: "rgba(42, 73, 94, 0.3)"
    },
    dot: {
      main: "#F24646"
    }
  }
});

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap&subset=cyrillic"
            rel="stylesheet"
          />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default withRouter(MyApp);

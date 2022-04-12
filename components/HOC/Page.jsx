import React from "react";
import io from "socket.io-client";
import SocketService from "../../services/SocketService";
import axios from "axios";
import { DialogsContext } from "../../context/listDialogs";
import { Layout } from "../Layout";
import { withRouter } from "next/router";
import cookies from "next-cookies";
import browserCookies from "browser-cookies";
import { UserContext } from "../../context/user";
import { apiMessageToMessage } from "../../utils/converter";

axios.defaults.baseURL = "http://localhost:3000/";

export default function withContextPage(Component) {
  class Page extends React.Component {
    constructor(props) {
      super(props);
      if (process.browser) {
        this.socket = io({
          query: {
            userid: browserCookies.get("userId")
          }
        });
        SocketService.init(this.socket);
      }

      this.state = {
        dialogs: props.dialogs.map(apiMessageToMessage)
      };
    }

    updateDialog = (dialogid, params) => {
      const { dialogs } = this.state;
      console.log(dialogs);
      const dialogIndex = dialogs.findIndex(dialog => dialog._id === dialogid);

      const newDialog = { ...dialogs[dialogIndex], ...params };

      dialogs[dialogIndex] = apiMessageToMessage(newDialog);

      this.setState({ dialogs });
    };

    refreshDialogs = async () => {
      const { userId } = this.props;
      console.log(userId);
      const {
        data: { data: dialogs }
      } = await axios.get(`/api/getDialogs/${userId}`, {
        headers: { userId }
      });
      console.log(dialogs);
      this.setState({ dialogs });
    };

    static async getInitialProps(appContext) {
      // calls page's `getInitialProps` and fills `appProps.pageProps`
      const appProps =
        Component.getInitialProps &&
        (await Component.getInitialProps(appContext));
      console.log(appProps);

      const { userId } = cookies(appContext);
      console.log(appContext, userId);
      const {
        data: { data: dialogs }
      } = await axios.get(`/api/getDialogs/${userId}`, { headers: { userId } });

      return {
        ...appProps,
        userId: userId,
        dialogs
      };
    }
    render() {
      const {
        router: { route },
        userId,
        ...appProps
      } = this.props;
      const { dialogs } = this.state;
      // экшены
      const { updateDialog, refreshDialogs } = this;
      return (
        <UserContext.Provider value={{ userId }}>
          <DialogsContext.Provider
            value={{ dialogs, updateDialog, userId, refreshDialogs }}
          >
            <Layout isLogin={route === "/login"}>
              <Component {...appProps} />
            </Layout>
          </DialogsContext.Provider>
        </UserContext.Provider>
      );
    }
  }
  return withRouter(Page);
}

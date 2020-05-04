import React, { Component } from "react";
import axios from "axios";
import withContextPage from "../components/HOC/Page";

class Profile extends Component {
  // static async getInitialProps() {
  //   const { data } = await axios.get("http://localhost:3000/api/user");
  //   return { user: data };
  // }
  render() {
    return (
      <div>
        Имя
        <hr />
        Возраст
      </div>
    );
  }
}

export default withContextPage(Profile);

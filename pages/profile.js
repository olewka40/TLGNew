import React, { memo } from "react";
import axios from "axios";
import withContextPage from "../components/HOC/Page";

const Profile = memo(() => {
  // static async getInitialProps() {
  //   const { data } = await axios.get("http://localhost:3000/api/user");
  //   return { user: data };
  // }

  return (
    <div>
      Имя
      <hr />
      Возраст
    </div>
  );
});

export default withContextPage(Profile);

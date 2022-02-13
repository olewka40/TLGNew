import React, { useContext, useEffect, useState } from "react";
import { SearchInput } from "../styled";
import { MenuItem } from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../../../../context/user";

export const SearchUser = () => {
  const [users, setUsers] = useState(null);
  const { userId } = useContext(UserContext);

  const createRoomWithUser = async value => {
    console.log(userId, "userId ");
    const { data } = await axios.post("/api/createDialog", {
      userId,
      secondUserId: value
    });
    console.log(data);
  };

  const getAllUsers = async () => {
    const { data } = await axios.get("/api/getAllUsers");
    setUsers(data.filter(user => user._id !== userId));
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <SearchInput
        style={{
          width: "100%",
          height: "85%",
          color: "white",
          position: "relative"
        }}
        variant="outlined"
        displayEmpty={true}
        color="promary"
        value="placeholder"
        onChange={e => {
          createRoomWithUser(e.target.value);
        }}
      >
        {users?.map(({ login, _id }) => (
          <MenuItem value={_id}> {login}</MenuItem>
        ))}
      </SearchInput>
      <Placeholder>Начать диалог</Placeholder>
    </>
  );
};

const Placeholder = styled.div`
  position: absolute;
  width: 150px;
  color: white;
  z-index: 11;
  left: 60px;
`;

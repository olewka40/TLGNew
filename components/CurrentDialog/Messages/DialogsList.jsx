import React, { memo, useContext } from "react";
import Emoji from "react-emoji-render";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import {
  ListOfMesseges,
  ImgAvatarCurrent,
  Messege,
  TextMessage,
  Time,
  Readed
} from "./styled";
import { UserContext } from "../../../context/user";
import Moment from "react-moment";
import { avatarImg } from "../../constants";

export const DialogsList = memo(({ message }) => {
  const { userId } = useContext(UserContext);

  return (
    <ListOfMesseges myMsg={message.senderId === userId} key={message.id}>
      <ImgAvatarCurrent src={avatarImg} />
      <Messege>
        <TextMessage>
          <Emoji text={message.text} />
        </TextMessage>
        <Time>
          <Moment format="HH:mm">{message.time}</Moment>
        </Time>
        <Readed>
          {/*<CheckIcon color={"primary"} />*/}
          <DoneAllIcon color="primary" />
        </Readed>
      </Messege>
    </ListOfMesseges>
  );
});

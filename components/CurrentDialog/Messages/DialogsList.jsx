import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import Emoji from "react-emoji-render";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import {
  ListOfMessages,
  ImgAvatarCurrent,
  Message,
  TextMessage,
  Time,
  Readed
} from "./styled";
import { UserContext } from "../../../context/user";
import Moment from "react-moment";
import axios from "axios";

export const DialogsList = memo(({ message }) => {
  const { userId } = useContext(UserContext);
  const [avatar, setAvatar] = useState("");
  const myMsg = message.senderId === userId;

  const handleGetAvatars = useCallback(async () => {
    if (!myMsg) {
      const { data } = await axios.get(
        `/api/getUserAvatar/${message.senderId}`
      );
      if (data === null) {
        return null;
      } else {
        setAvatar(data.userAvatar.avatar);
      }
    } else return null;
  }, [message, setAvatar]);

  useEffect(() => {
    handleGetAvatars();
  }, []);
  return (
    <ListOfMessages myMsg={myMsg} key={message.id}>
      <ImgAvatarCurrent src={`http://localhost:3000/api/files/${avatar}`} />
      <Message>
        <TextMessage>
          <Emoji text={message.text} />
        </TextMessage>
        <Time>
          <Moment format="HH:mm">{message.time}</Moment>
        </Time>
        {myMsg && (
          <Readed>
            {/*<CheckIcon color={"primary"} />*/}
            <DoneAllIcon color="primary" />
          </Readed>
        )}
      </Message>
    </ListOfMessages>
  );
});

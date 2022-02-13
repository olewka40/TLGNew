import { useRouter } from "next/router";
import CheckIcon from "@material-ui/icons/Check";
import Emoji from "react-emoji-render";
import React, { useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import {
  DialogContainer,
  ImgAvatar,
  DialogInfo,
  TopInfo,
  UserName,
  MsgInfo,
  Time,
  BotInfo,
  Message
} from "./styled";
import axios from "axios";

export const Dialog = ({
  userId,
  dialogid,
  active,
  name,
  message,
  time,
  users,
  opened
}) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  console.log(time._isValid);
  const handleGetAvatars = useCallback(async () => {
    const sobesednikId = users.filter(e => e.userId !== userId)[0].userId;
    const { data } = await axios.get(`/api/getUserAvatar/${sobesednikId}`);
    if (data === null) {
      return null;
    } else {
      setAvatar(data.userAvatar.avatar);
    }
  }, [users]);

  useEffect(() => {
    handleGetAvatars();
  }, []);

  return (
    <DialogContainer
      active={active}
      onClick={() => {
        router.push("/dialogs/[id]", `/dialogs/${dialogid}`);
      }}
    >
      <ImgAvatar src={`http://localhost:3000/api/files/${avatar}`} />
      {opened && (
        <DialogInfo>
          <TopInfo>
            <UserName>{name} </UserName>

            <MsgInfo>
              <CheckIcon color="primary" fontSize="small" />
              <Time>
                {time._isValid && <Moment format="HH:mm">{time}</Moment>}
              </Time>
            </MsgInfo>
          </TopInfo>
          <BotInfo>
            <Message>
              <Emoji text={message} />
            </Message>
          </BotInfo>
        </DialogInfo>
      )}
    </DialogContainer>
  );
};

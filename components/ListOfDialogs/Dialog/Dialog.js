import { useRouter } from "next/router";
import CheckIcon from "@material-ui/icons/Check";
import Emoji from "react-emoji-render";
import React from "react";
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
  // const sobesednikId = users.filter(e => e.userLogin !== userId);
  // console.log(sobesednikId[0].userLogin);
  // console.log(userId, "3421");

  return (
    <DialogContainer
      active={active}
      onClick={() => {
        router.push("/dialogs/[id]", `/dialogs/${dialogid}`);
      }}
    >
      <ImgAvatar />
      {opened && (
        <DialogInfo>
          <TopInfo>
            <UserName>{name} </UserName>

            <MsgInfo>
              <CheckIcon color="primary" fontSize="small" />
              <Time>
                <Moment format="HH:mm">{time}</Moment>
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

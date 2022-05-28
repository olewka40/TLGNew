import React, { memo, useCallback, useContext, useEffect } from "react";
import SocketService from "../../../services/SocketService";
import { useRouter } from "next/router";
import { Dialog } from "../Dialog/Dialog";
import { List } from "./styled";
import { UserContext } from "../../../context/user";

export const Dialogs = memo(props => {
  const {
    opened,
    context: { dialogs, updateDialog, userId }
  } = props;
  const { success } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;
  const onMessage = useCallback(data => {
    const { dialogId, senderId, ...props } = data;
    updateDialog(dialogId, props);
  }, []);
  useEffect(() => {
    if (!success) {
      router.replace("/login");
      return;
    }

    SocketService.on("messageFromOpenChat", onMessage);
  }, [success]);

  return (
    <List opened={opened}>
      {dialogs.map(({ _id, name, message, time, users, readed }) => (
        <Dialog
          userId={userId}
          opened={opened}
          active={id === _id}
          key={_id}
          name={name}
          dialogid={_id}
          message={message}
          time={time}
          users={users}
          readed={readed}
        />
      ))}
    </List>
  );
});

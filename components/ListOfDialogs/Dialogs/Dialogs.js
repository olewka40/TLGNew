import React, { memo, useCallback, useEffect } from "react";
import SocketService from "../../../services/SocketService";
import { useRouter } from "next/router";
import { Dialog } from "../Dialog/Dialog";
import { List } from "./styled";

export const Dialogs = memo(props => {
  const {
    opened,
    context: { dialogs, updateDialog,userId }
  } = props;

  const onMessage = useCallback(data => {
    const { dialogId, senderId, ...props } = data;

    updateDialog(dialogId, props);
  }, []);
  useEffect(() => {
    SocketService.on("messageFromOpenChat", onMessage);
  }, []);
  const router = useRouter();
  const { id } = router.query;
  return (
    <List opened={opened}>
      {dialogs.map(({ _id, name, message, time, users }) => (
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
        />
      ))}
    </List>
  );
});

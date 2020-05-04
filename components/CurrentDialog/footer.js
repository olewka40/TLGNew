import React, { useCallback, useRef, useState } from "react";
import { IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import MoodIcon from "@material-ui/icons/Mood";
import styled from "styled-components";
import SocketService from "../../services/SocketService";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const areaRef = useRef();
  const [opened, setOpen] = useState(true);
  const onSend = useCallback(() => {
    if (!areaRef.current.value) return;

    SocketService.emit("message-to-dialog", {
      dialogId: router.query.id,

      message: areaRef.current.value
    });
    areaRef.current.value = "";
  }, [router.query.id]);

  return (
    <MsgPlace>
      <IconButton>
        <AttachFileIcon style={{ color: "#6b757f" }} />
      </IconButton>
      <Textarea ref={areaRef} />
      <IconButton
        onClick={() => {
          setOpen(!opened);
        }}
      >
        <MoodIcon style={{ color: "#6b757f" }} />
      </IconButton>
      <IconButton onClick={onSend}>
        <SendIcon style={{ color: "#6b757f" }} />
      </IconButton>
    </MsgPlace>
  );
};
const MsgPlace = styled.div`
  display: flex;
  min-height: 50px;
  background: #17212b;
`;
const Textarea = styled.textarea`
  flex-grow: 1;
  background-color: transparent;
  resize: none;
  border: 0;
`;

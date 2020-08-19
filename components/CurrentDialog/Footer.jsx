import React, { memo, useCallback, useContext, useRef, useState } from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import MoodIcon from "@material-ui/icons/Mood";
import styled from "styled-components";
import SocketService from "../../services/SocketService";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import { MessageLayoutContext } from "../../context/messageLayoutContext";

import { Popover, IconButton } from "@material-ui/core";
import { EmojiTabs } from "./emojiTabs";

export const Footer = () => {
  const router = useRouter();
  const areaRef = useRef();
  const [message, setMessage] = useState("");
  const onSend = useCallback(() => {
    if (!areaRef.current.value) return;

    SocketService.emit("message-to-dialog", {
      dialogId: router.query.id,

      message: areaRef.current.value
    });
    areaRef.current.value = "";
    setMessage("");
  }, [router.query.id]);

  const { isLayoutOpened, setLayoutOpened } = useContext(MessageLayoutContext);
  const [isHovered, setHovered] = useState(false);
  const triggerPicker = useCallback(
    event => {
      event.preventDefault();
      setLayoutOpened(!isLayoutOpened);
    },
    [isLayoutOpened, setLayoutOpened]
  );
  const onMouseOver = useCallback(() => {
    if (isLayoutOpened) {
      return null;
    } else {
      setHovered(true);
    }
  }, [isHovered]);
  const onMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);
  return (
    <MsgPlace>
      <IconButton>
        <AttachFileIcon color="primary" />
      </IconButton>
      <StyledTextArea>
        <TextareaAutosize
          style={{ height: 100 }}
          className="area"
          wrap="soft"
          id="name"
          type="text"
          aria-describedby="name-desc"
          value={message}
          onChange={event => setMessage(event.target.value)}
          ref={areaRef}
        />
      </StyledTextArea>

      <IconButton
        onMouseMove={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={triggerPicker}
      >
        <MoodIcon color="primary" />
        <Popover
          open={isHovered}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 875, left: 1920 }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <EmojiTabs setMessage={setMessage} message={message} />
        </Popover>
      </IconButton>
      <IconButton onClick={onSend}>
        <SendIcon color="primary" />
      </IconButton>
    </MsgPlace>
  );
};

const MsgPlace = styled.div`
  display: flex;
  background: #17212b;
  align-items: flex-end;
  max-height: 100%;
`;

const StyledTextArea = styled.div`
  width: 100%;
  > .area {
    flex-grow: 1;
    outline: none;
    background-color: transparent;
    border: 0;
    font-size: 16px;
    font-family: Roboto, sans-serif;
    width: 100%;
    min-height: 30px;
    color: #efe9e9;
    overflow: hidden;
    resize: vertical;
  }
`;
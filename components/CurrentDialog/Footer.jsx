import React, { memo, useCallback, useContext, useRef, useState } from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import MoodIcon from "@material-ui/icons/Mood";
import styled from "styled-components";
import SocketService from "../../services/SocketService";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import { MessageLayoutContext } from "../../context/messageLayoutContext";
import TransformIcon from "@material-ui/icons/Transform";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { EmojiBar } from "./EmojiBar";
import { UserContext } from "../../context/user";
import swithcher from "ai-switcher-translit";

export const Footer = memo(({ message, setMessage, messages }) => {
  const router = useRouter();
  const areaRef = useRef();
  const { userId } = useContext(UserContext);
  const onSend = useCallback(() => {
    if (!areaRef.current.value) return;

    SocketService.emit("message-to-dialog", {
      dialogId: router.query.id,

      message: areaRef.current.value
    });
    areaRef.current.value = "";
    setMessage("");
    areaRef.current.focus();
    const lastMsg = messages[messages?.length - 1];
    const isMyMsg = lastMsg?.senderId === userId;
    if (!isMyMsg && lastMsg) {
      SocketService.emit("readMessage", {
        messageId: lastMsg._id
      });
    }
  }, [router.query.id]);

  const { isLayoutOpened, setLayoutOpened } = useContext(MessageLayoutContext);
  const [isHovered, setHovered] = useState(false);

  const triggerPicker = event => {
    console.log("isLayoutOpened", isLayoutOpened);
    if (isLayoutOpened) {
      setLayoutOpened(false);
    }
    if (!isLayoutOpened) {
      setLayoutOpened(true);
    }
    setLayoutOpened(!isLayoutOpened);
  };

  const onMouseOver = useCallback(() => {
    if (isLayoutOpened) {
      return null;
    } else {
      setHovered(true);
    }
  }, [isHovered]);

  const onMouseLeave = useCallback(() => {
    setTimeout(setHovered(false), 1000);
  }, []);
  const switchLang = type => {
    const result = swithcher.getSwitch(message, {
      type
    });

    setMessage(result);
    handleClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <MsgPlace>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <StyledTextArea>
        <TextareaAutosize
          autoFocus
          className="area"
          wrap="soft"
          id="name"
          type="text"
          aria-describedby="name-desc"
          value={message}
          onChange={event => setMessage(event.target.value)}
          ref={areaRef}
          onKeyPress={event => {
            if (event.key === "Enter") {
              event.stopPropagation();
              event.preventDefault();
              onSend();
            }
          }}
        />
      </StyledTextArea>
      <IconButton
        disabled={message.indexOf(':') !== -1}
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <TransformIcon color={message.indexOf(':') !== -1 ? '' : 'primary'} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => switchLang("engru")}>
          English - Русский
        </MenuItem>
        <MenuItem onClick={() => switchLang("rueng")}>
          Русский - English
        </MenuItem>
        <MenuItem onClick={() => switchLang("translit")}>Транслит</MenuItem>
        <MenuItem onClick={() => switchLang("retranslit")}>
          Ре-Транслит
        </MenuItem>
      </Menu>

      <IconButton onMouseMove={onMouseOver} onMouseLeave={onMouseLeave}>
        <div onClick={triggerPicker}>
          <MoodIcon color="primary" />
        </div>
        {isHovered && (
          <EmojiWrapper>
            <EmojiBar setMessage={setMessage} message={message} />
          </EmojiWrapper>
        )}
      </IconButton>
      <IconButton onClick={onSend}>
        <SendIcon color="primary" />
      </IconButton>
    </MsgPlace>
  );
});

const EmojiWrapper = styled.div`
  position: absolute;
  height: 740px;
  bottom: 45px;
  right: -38px;
`;

const MsgPlace = styled.div`
  display: flex;
  background: #17212b;
  justify-content: center;
  max-height: 100%;
  display: flex;
  align-items: baseline;
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

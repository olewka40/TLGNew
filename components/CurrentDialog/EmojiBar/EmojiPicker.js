import React from "react";
import { Picker } from "emoji-mart";
import styled from "styled-components";
export const EmojiPicker = ({ setMessage }, message) => {
  return (
    <EmojiPickerContainer>
      <Picker
        style={{
          width: 300,
          borderRadius: 3,
          overflowY: "hidden"
        }}
        title="Pick your emoji…"
        emoji="point_up"
        set="apple"
        onSelect={emoji => setMessage(message + emoji.colons)}
      />
    </EmojiPickerContainer>
  );
};

const EmojiPickerContainer = styled.div`
  height: calc(100% - 48px);

  .emoji-mart {
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
  }
`;

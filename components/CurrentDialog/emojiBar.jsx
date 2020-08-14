import React, { useContext, useState, memo } from "react";
import data from "emoji-mart/data/apple.json";
import { NimblePicker } from "emoji-mart";
import styled from "styled-components";
import { MessageLayoutContext } from "../../context/messageLayoutContext";

const EmojiBar = memo(() => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const { isLayoutOpened } = useContext(MessageLayoutContext);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(setChosenEmoji(emojiObject));
  };
  if (!isLayoutOpened) {
    return null;
  }

  return (
    <Container>
      <NimblePicker
        title="Pick your emoji…"
        emoji="point_up"
        data={data}
        set="apple"
        onSelect={emoji => console.log("emoji", emoji.native)}
      />
    </Container>
  );
});

export default EmojiBar;

const Container = styled.div`
  > .emoji-mart {
    display: flex;
    flex-direction: column-reverse;
    .emoji-mart-search {
      display: none;
    }
    .emoji-mart-scroll {
      height: calc(90.92vh + 40px);
    }
  }
`;

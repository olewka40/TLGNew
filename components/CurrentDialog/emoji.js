import React, { useState } from "react";
import { Picker } from "emoji-mart";
import styled, { css } from "styled-components";

const Emoji = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(setChosenEmoji(emojiObject));
  };

  return (
    <div>
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        emojiSize={30}
        showPreview={false}
        onSelect={emoji => console.log("emoji", emoji)}
      />
    </div>
  );
};

export default Emoji;

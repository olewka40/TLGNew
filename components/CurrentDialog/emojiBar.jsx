import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MessageLayoutContext } from "../../context/messageLayoutContext";
import PropTypes from "prop-types";
import { EmojiTabs } from "./emojiTabs";

const EmojiBar = () => {
  return (
    <Container>
      <StyledPicker>
        <EmojiTabs />
      </StyledPicker>
    </Container>
  );
};

export default EmojiBar;

const Container = styled.div`
  color: #6b757f;
  width: 300px;
  height: 100vh;
`;

const StyledPicker = styled.div`
  > .emoji-mart {
    display: flex;
    flex-direction: column-reverse;
    .emoji-mart-search {
      display: none;
    }
    .emoji-mart-scroll {
      height: calc(90vh);
    }
    .MuiTab-root {
      min-width: 100px;
    }
  }
`;

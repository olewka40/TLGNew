import React, { useState, memo, useContext } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MessageContext } from "../../context/messages";
import EmojiBar from "./emojiBar";
import { MessageLayoutContext } from "../../context/messageLayoutContext";
import { DialogsList } from "./Messages/DialogsList";
import { OpenedDialog, MainItems, Messeges } from "./styled";

export const DialogContainer = memo(() => {
  const [isLayoutOpened, setLayoutOpened] = useState(false);
  const { messages } = useContext(MessageContext);
  return (
    <MessageLayoutContext.Provider value={{ isLayoutOpened, setLayoutOpened }}>
      <OpenedDialog>
        <MainItems>
          <Header />
          <Messeges>
            {messages.map(message => (
              <DialogsList message={message} />
            ))}
          </Messeges>
          <Footer />
        </MainItems>
        <EmojiBar />
      </OpenedDialog>
    </MessageLayoutContext.Provider>
  );
});

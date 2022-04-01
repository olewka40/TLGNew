import React, { useState, memo, useContext } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MessageContext } from "../../context/messages";
import { EmojiBar } from "./EmojiBar";
import { MessageLayoutContext } from "../../context/messageLayoutContext";
import { DialogsList } from "./Messages/DialogsList";
import { OpenedDialog, MainItems, Messeges } from "./styled";

export const DialogContainer = memo(() => {
  const [isLayoutOpened, setLayoutOpened] = useState(false);
  const { messages } = useContext(MessageContext);
  const [message, setMessage] = useState("");

  return (
    <MessageLayoutContext.Provider value={{ isLayoutOpened, setLayoutOpened }}>
      <OpenedDialog>
        <MainItems>
          <Header />
          <Messeges>
            {messages.map(message => (
              <DialogsList key={message.id} message={message} />
            ))}
          </Messeges>
          <Footer setMessage={setMessage} message={message} />
        </MainItems>
        {isLayoutOpened && (
          <EmojiBar setMessage={setMessage} message={message} />
        )}
      </OpenedDialog>
    </MessageLayoutContext.Provider>
  );
});

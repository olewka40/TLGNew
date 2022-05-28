import React, { useState, memo, useContext, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MessageContext } from "../../context/messages";
import { EmojiBar } from "./EmojiBar";
import { MessageLayoutContext } from "../../context/messageLayoutContext";
import { DialogsList } from "./Messages/DialogsList";
import { OpenedDialog, MainItems, Messages } from "./styled";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";

export const DialogContainer = memo(() => {
  const [isLayoutOpened, setLayoutOpened] = useState(false);
  const { messages } = useContext(MessageContext);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const escFunction = event => {
    if (event.key === "Escape") {
      router.push("/dialogs");
    }
  };
  console.log(messages, "messages");
  useEffect(() => {
    const block = document.getElementById("CurrentDialog");
    block.scrollTop = block.scrollHeight;
    document.addEventListener("keydown", escFunction, false);
  }, [messages]);

  return (
    <MessageLayoutContext.Provider value={{ isLayoutOpened, setLayoutOpened }}>
      <OpenedDialog>
        <MainItems>
          <Header />
          {messages.length > 20 && (
            <Button variant="outlined" color="primary">
              Загрузить еще
            </Button>
          )}
          <Messages id="CurrentDialog">
            {messages.map(message => (
              <DialogsList key={message.id} dialogMessage={message} />
            ))}
          </Messages>
          <Footer
            setMessage={setMessage}
            message={message}
            messages={messages}
          />
        </MainItems>
        {isLayoutOpened && (
          <EmojiBar setMessage={setMessage} message={message} />
        )}
      </OpenedDialog>
    </MessageLayoutContext.Provider>
  );
});

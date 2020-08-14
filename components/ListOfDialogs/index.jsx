import React from "react";
import { DialogsContext } from "../../context/listDialogs";
import { Dialogs } from "./Dialogs/Dialogs";

export default props => {
  return (
    <DialogsContext.Consumer>
      {context => {
        return <Dialogs {...props} context={context} />;
      }}
    </DialogsContext.Consumer>
  );
};

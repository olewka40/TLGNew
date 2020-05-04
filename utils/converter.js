import moment from "moment";
export const apiMessageToMessage = apiMessage => {
  const cloneMessage = JSON.parse(JSON.stringify(apiMessage));

  cloneMessage.time = moment(cloneMessage.time);

  // return message typeу
  return { ...cloneMessage };
};

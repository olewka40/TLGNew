export const checkPass = value => {
  const templateValue = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return templateValue.test(value);
};
export const checkEmail = value => {
  const templateValue = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return templateValue.test(value);
};

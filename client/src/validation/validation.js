export const isValidNickname = (nickname) => {
  const text = new TextEncoder('utf-8').encode(nickname);
  return text.length <= 32;
};

export const isValidEmail = (email) => {
  const regExp = new RegExp(
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
  );
  if (regExp.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const isValidPassword = (password) => {
  const regExp = new RegExp(
    /^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,128}$/
  );
  if (regExp.test(password)) {
    return true;
  } else {
    return false;
  }
};

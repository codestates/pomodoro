const utf8Length = (s) => {
  if (s != undefined && s != '') {
    for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    return b;
  } else {
    return 0;
  }
};

const checkEmaliValidity = (email) => {
  const mailCheckRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return mailCheckRegEx.test(email);
};

module.exports = { utf8Length, checkEmaliValidity };

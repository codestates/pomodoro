const checkInputData = (res, dataArr) => {
  if (dataArr) {
    for (item of dataArr) {
      if (!item) {
        console.log('[ERROR] /api/users POST -> 400 : insufficient parameters');
        return res.status(400).send('insufficient parameters');
      }
    }
  } else {
    console.log('[ERROR] /api/users POST -> 400 : no dataArr');
    return res.status(400).send('no dataArr');
  }
};

const findUserInfomation = (res, user) => {
  if (!user) {
    console.log(
      '[ERROR] /api/mails/:token POST -> 401 : find not user infomation'
    );
    return res.status(401).send('find not user infomation');
  }
};

const pendingValidValueCheck = (res, pending) => {
  if (pending === false) {
    console.log(
      '[ERROR] /api/mails/:token POST -> 401 : This member is already a verified member.'
    );
    return res.status(401).send('This member is already a verified member.');
  }
};

const sequelizeError = (res, err, path, message) => {
  console.log(`[ERROR] ${path} -> 500 : ${message}`);
  console.error(`[ERROR-MESSAGE] ${err}`);
  return res.status(500).send(`${message}`);
};

module.exports = {
  checkInputData,
  findUserInfomation,
  pendingValidValueCheck,
  sequelizeError,
};

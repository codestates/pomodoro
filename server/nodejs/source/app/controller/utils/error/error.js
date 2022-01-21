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

const checkToken_400_401_404 = (res, path, user) => {
  if (user === 400) {
    console.log(`[ERROR] ${path} -> 400 : Bad Reuqest`);
    res.status(400).send('Bad Reuqest');
    return false;
  }
  if (user === 401) {
    console.log(`[ERROR] ${path} -> 401 : Unauthorized`);
    res.status(401).send('Unauthorized');
    return false;
  }
  if (user === 404) {
    console.log(`[ERROR] ${path} -> 404 : Not found`);
    res.status(404).send('Not found');
    return false;
  }
  return true;
};

const findUserInfomation = (res, path, user) => {
  if (!user) {
    console.log(`[ERROR] ${path} -> 401 : find not user infomation`);
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
  checkToken_400_401_404,
  pendingValidValueCheck,
  sequelizeError,
};

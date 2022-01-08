const { createToken } = require('../utils/tokenFunctions');

const startPomodoro = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(`[ERROR] /api/pomodoro POST -> req.token = ${req.token}`);
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/pomodoro POST -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(`[ERROR] /api/pomodoro POST -> user id is invalid`);
    return res.status(400).send('user id is invalid');
  }

  delete req.token.iat;
  delete req.token.exp;
  const payload = {
    ...req.token,
    lastpomo: new Date().toISOString(),
  };
  const newToken = createToken(payload, '3h');

  //return token
  console.log(
    `[SUCCESS] /api/pomodoro POST -> 200 : user ${req.token.username} started Pomodoro`
  );
  res.header('Authorization', 'Bearer ' + newToken);
  return res.status(200).json({ newToken });
};

module.exports = startPomodoro;

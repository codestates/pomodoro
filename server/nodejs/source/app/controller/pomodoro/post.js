const { User } = require('../../models');
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

  let startPomo;
  try {
    startPomo = await User.update(
      { pomo_started: new Date() },
      { where: { user_id: req.token.id } }
    );
  } catch (err) {
    console.log(`[ERROR] /api/pomodoro POST -> ${err}`);
    return res.status(500).send(err);
  }

  if (!startPomo[0]) {
    console.log(
      `[ERROR] /api/pomodoro POST -> user_id ${req.token.id} (${req.token.username}) not exist`
    );
    return res.status(400).send(`not a valid user`);
  }

  delete req.token.iat;
  delete req.token.exp;
  const newToken = createToken(req.token, '3h');

  //return token
  console.log(
    `[SUCCESS] /api/pomodoro POST -> 201 : user ${req.token.username} started Pomodoro`
  );
  res.header('Authorization', 'Bearer ' + newToken);
  return res.status(201).json({ newToken });
};

module.exports = startPomodoro;

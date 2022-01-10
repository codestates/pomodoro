const { User } = require('../../models');

const incrementPomodoroCount = async (req, res) => {
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

  let currentPomo;
  try {
    currentPomo = await User.findOne({
      attributes: ['pomo_started', 'num_pomo'],
      where: { user_id: req.token.id },
    });
  } catch (err) {
    console.log(`[ERROR] /api/pomodoro POST -> ${err}`);
    return res.status(500).send(err);
  }

  if (!currentPomo) {
    console.log(
      `[ERROR] /api/pomodoro POST -> user_id ${req.token.id} (${req.token.username}) not exist`
    );
    return res.status(400).send(`not a valid user`);
  }

  if (!currentPomo.pomo_started) {
    console.log(`[ERROR] /api/pomodoro POST -> pomo_started does not exist`);
    return res.status(400).send(`looks like you didn't start pomodoro`);
  }

  const now = new Date();
  const then = new Date(currentPomo.pomo_started);
  const diff = now.getTime() - then.getTime();
  const diffMinutes = Math.round(diff / 1000 / 60);
  if (diffMinutes !== 25) {
    console.log(
      `[ERROR] /api/pomodoro POST -> Pomodoro elapsed time (${diffMinutes}m) is invalid`
    );
    return res
      .status(403)
      .send(`you have failed to pass the pomodoro. restart again`);
  }

  let stopPomo;
  try {
    stopPomo = await User.update(
      { pomo_started: null, num_pomo: currentPomo.num_pomo + 1 },
      { where: { user_id: req.token.id } }
    );
  } catch (err) {
    console.log(`[ERROR] /api/pomodoro POST -> ${err}`);
    return res.status(500).send(err);
  }

  console.log(
    `[SUCCESS] /api/pomodoro POST -> 204 : user ${req.token.username} stopped Pomodoro`
  );
  return res.status(204).send();
};

module.exports = incrementPomodoroCount;

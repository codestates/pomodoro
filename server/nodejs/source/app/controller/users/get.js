const { User, sequelize } = require('../../models');

const userInfo = (req, res) => {
  if (typeof req.token === 'number') {
    console.log(`[ERROR] /api/users GET -> req.token = ${req.token}`);
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/users GET -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(`[ERROR] /api/users GET -> user id is invalid`);
    return res.status(400).send('user id is invalid');
  }

  //Get ranks and info
  const rankQuery = sequelize.literal(
    `(SELECT user_rank.rank FROM (SELECT RANK() OVER (ORDER BY num_pomo DESC) AS 'rank', user_id FROM User WHERE NOT pending=1) user_rank WHERE user_id = ${req.token.id})`
  );
  const attributes = [
    'email',
    'nickname',
    ['num_pomo', 'pomo'],
    [rankQuery, 'rank'],
    'pending',
  ];
  const where = { user_id: req.token.id };

  User.findOne({ attributes, where })
    .then((result) => {
      if (!result) {
        console.log(`[ERROR] /api/users GET -> 404 : user not found`);
        return res.status(404).send('user not found');
      }

      console.log(`[SUCCESS] /api/users GET -> 200 : user found`);
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(`[ERROR] /api/users GET -> 500 : ${err}`);
      return res.status(500).send('Internal Server Error');
    });
};

module.exports = userInfo;

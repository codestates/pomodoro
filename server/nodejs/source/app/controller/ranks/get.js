const { User, sequelize } = require('../../models');

const getRanks = async (req, res) => {
  const attributes = [
    [sequelize.literal('(ROW_NUMBER() OVER (ORDER BY num_pomo DESC))'), 'rank'],
    'nickname',
    ['num_pomo', 'score'],
  ];
  const order = [['num_pomo', 'DESC']];
  const where = { pending: false };

  let ranks;
  try {
    ranks = await User.findAll({ attributes, order, where });
  } catch (err) {
    console.log(`[ERROR] /api/ranks GET -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  console.log(`[SUCCESS] /api/ranks GET -> 200 : ranks sent`);
  return res.status(200).json(ranks);
};

module.exports = getRanks;

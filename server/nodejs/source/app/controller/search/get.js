const { Music, sequelize } = require('../../models');
const { Op } = require('sequelize');
const { utf8Length } = require('../utils/utils');

const searchQuery = async (req, res) => {
  if (!req.query['q']) {
    console.log(`[ERROR] /api/search GET -> 400 : query does not exist`);
    return res.status(400).send('query does not exist');
  }

  if (typeof req.query.q !== 'string') {
    console.log(`[ERROR] /api/search GET -> 400 : query is invalid`);
    return res.status(400).send('Invalid query type');
  }

  if (utf8Length(req.query.q) > 128) {
    console.log(`[ERROR] /api/search GET -> 400 : query is too long`);
    return res.status(400).send('query is too long');
  }

  const attributes = [
    ['music_address', 'music_url'],
    [sequelize.fn('ANY_VALUE', sequelize.col('music_id')), 'music_id'],
    [sequelize.fn('ANY_VALUE', sequelize.col('music_name')), 'music_name'],
    [sequelize.fn('ANY_VALUE', sequelize.col('music_length')), 'music_time'],
  ];
  const where = { music_name: { [Op.like]: `%${req.query.q}%` } };
  const group = ['music_url'];
  let searchResult;
  try {
    searchResult = await Music.findAll({ attributes, where, group });
  } catch (err) {
    console.log(`[ERROR] /api/search GET -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  console.log(`[SUCCESS] /api/search GET -> 200 : search result sent`);
  return res.status(200).json({ result: searchResult });
};

module.exports = searchQuery;

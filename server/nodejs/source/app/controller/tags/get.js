const { User, sequelize } = require('../../models');

const getAllTags = async (req, res) => {
  const stub = `[stub] /api/tags GET`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = getAllTags;

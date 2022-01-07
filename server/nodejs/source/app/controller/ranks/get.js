const getRanks = async (req, res) => {
  const stub = `[stub] /api/ranks GET`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = getRanks;

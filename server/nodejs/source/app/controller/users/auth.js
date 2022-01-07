const login = async (req, res) => {
  const stub = `[stub] /api/auth POST`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = login;

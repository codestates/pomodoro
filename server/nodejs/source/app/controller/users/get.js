const userInfo = async (req, res) => {
  const stub = `[stub] /api/users GET`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = userInfo;

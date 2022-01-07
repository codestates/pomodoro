const deleteUser = async (req, res) => {
  const stub = `[stub] /api/users DELETE`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = deleteUser;

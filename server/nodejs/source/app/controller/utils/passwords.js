const sendEmailToRetrievePassword = async (req, res) => {
  const stub = `[stub] /api/passwords POST`;
  console.log(stub);
  res.status(200).send(stub);
};

const changeUserPassword = async (req, res) => {
  const stub = `[stub] /api/passwords PATCH`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = {
  post: sendEmailToRetrievePassword,
  patch: changeUserPassword,
};

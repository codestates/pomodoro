const incrementPomodoroCount = async (req, res) => {
  const stub = `[stub] /api/pomodoro PATCH`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = incrementPomodoroCount;

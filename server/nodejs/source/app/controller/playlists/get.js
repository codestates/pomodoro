const getPlaylist = async (req, res) => {
  const stub = `[stub] /api/playlists GET`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = getPlaylist;

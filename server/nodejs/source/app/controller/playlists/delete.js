const removePlaylist = async (req, res) => {
  const stub = `[stub] /api/playlists DELETE`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = removePlaylist;

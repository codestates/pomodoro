const getMusicsForPlaylist = async (req, res) => {
  const stub = `[stub] /api/playlists/{:playlist_id} GET`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = getMusicsForPlaylist;

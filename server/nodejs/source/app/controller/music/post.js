const addMusicsForPlaylist = async (req, res) => {
  const stub = `[stub] /api/playlists/{:playlist_id} POST`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = addMusicsForPlaylist;

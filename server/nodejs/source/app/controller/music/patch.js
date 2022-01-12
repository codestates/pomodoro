const renameMusicName = async (req, res) => {
  const stub = `[stub] /api/playlists/{:playlists_id}/{:musics_id} PATCH`;
  console.log(stub);
  res.status(200).send(stub);
};

module.exports = renameMusicName;

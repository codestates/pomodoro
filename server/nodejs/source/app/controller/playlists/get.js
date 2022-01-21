const { Playlist, sequelize } = require('../../models');

const getPlaylist = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(`[ERROR] /api/playlists GET -> req.token = ${req.token}`);
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/playlists GET -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(`[ERROR] /api/playlists GET -> user id is invalid`);
    return res.status(400).send('user id is invalid');
  }

  const attributes = [
    'playlist_id',
    'playlist_name',
    [
      sequelize.fn('SUM', sequelize.col('Musics.music_length')),
      'playlist_time',
    ],
  ];
  const where = { user_id: req.token.id };
  const include = [{ association: 'Musics', attributes: [] }];
  const group = ['playlist_id'];

  let result;
  try {
    result = await Playlist.findAll({ attributes, where, include, group });
  } catch (err) {
    console.log(`[ERROR] /api/playlists GET -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  console.log(`[SUCCESS] /api/playlists GET -> 200 : playlist sent`);
  return res.status(200).json({ result });
};

module.exports = getPlaylist;

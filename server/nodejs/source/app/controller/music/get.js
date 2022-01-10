const { music } = require('..');
const { Playlist, Music, sequelize } = require('../../models');

const getMusicsForPlaylist = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(
      `[ERROR] /api/playlists/:playlist_id GET -> req.token = ${req.token}`
    );
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(`[ERROR] /api/playlists/:playlist_id GET -> id does not exist`);
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id GET -> user id is invalid`
    );
    return res.status(400).send('user id is invalid');
  }

  if (!req.params['playlist_id']) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id GET -> playlist_id does not exist`
    );
    return res.status(400).send('playlist_id does not exist');
  }

  if (
    isNaN(req.params.playlist_id) ||
    req.params.playlist_id < 1 ||
    req.params.playlist_id > 10
  ) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id GET -> playlist_id is invalid : ${req.params.playlist_id}`
    );
    return res.status(400).send('playlist_id is invalid');
  }

  let attributes = ['music_order'];
  let where = { user_id: req.token.id, playlist_id: req.params.playlist_id };
  let musicOrder;
  try {
    musicOrder = await Playlist.findOne({ attributes, where });
  } catch (err) {
    console.log(`[ERROR] /api/playlists/:playlist_id GET -> ${err}`);
    return res.status(500).send('internal server error');
  }

  if (!musicOrder) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id GET -> playlist_id does not exist`
    );
    return res.status(400).send('playlist_id does not exist');
  }

  musicOrder = JSON.parse(musicOrder.music_order);

  attributes = [
    'music_id',
    'music_name',
    ['music_address', 'music_url'],
    ['music_length', 'music_time'],
  ];
  where = { playlist_id: req.params.playlist_id };
  if (musicOrder && musicOrder.length) {
    musicOrder = musicOrder.join(',');
    order = [
      [sequelize.literal(`(FIELD(music_id, ${musicOrder}))`), 'ASC'],
      ['music_id', 'ASC'],
    ];
  } else {
    order = [['music_id', 'ASC']];
  }
  let result;
  try {
    result = await Music.findAll({ attributes, where, order });
  } catch (err) {
    console.log(`[ERROR] /api/playlists/:playlist_id GET -> ${err}`);
    return res.status(500).send('internal server error');
  }

  console.log(`[SUCCESS] /api/playlists/:playlist_id GET -> 200 : music sent`);
  return res.status(200).json({ result });
};

module.exports = getMusicsForPlaylist;

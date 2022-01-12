const { Playlist, Music } = require('../../models');
const { utf8Length } = require('../utils/utils');

const addMusicsForPlaylist = async (req, res) => {
  if (typeof req.token === 'number') {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> req.token = ${req.token}`
    );
    return res.status(401).send('unauthorized');
  }

  if (!req.token['id']) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> id does not exist`
    );
    return res.status(400).send('id does not exist');
  }

  if (isNaN(req.token.id) || req.token.id < 1 || req.token.id > 2147483647) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> user id is invalid`
    );
    return res.status(400).send('user id is invalid');
  }

  if (!req.params['playlist_id']) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> playlist_id does not exist`
    );
    return res.status(400).send('playlist_id does not exist');
  }

  if (
    isNaN(req.params.playlist_id) ||
    req.params.playlist_id < 1 ||
    req.params.playlist_id > 10
  ) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> playlist_id is invalid : ${req.params.playlist_id}`
    );
    return res.status(400).send('playlist_id is invalid');
  }

  //check if music has valid format
  if (
    !req.body['music_name'] ||
    !req.body['music_url'] ||
    !req.body['music_time']
  ) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> 400 : music_name, music_url, music_time does not exist`
    );
    return res.status(400).send('insufficient parameters');
  }

  if (
    typeof req.body.music_name !== 'string' ||
    typeof req.body.music_url !== 'string'
  ) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> 400 : music_name or music_url is invalid`
    );
    return res.status(400).send('invalid parameters');
  }

  if (
    req.body.music_name.trim().length === 0 ||
    req.body.music_url.trim().length === 0
  ) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> 400 : music_name or music_url only has whitespaces`
    );
    return res.status(400).send('music_name or music_url is invalid');
  }

  if (
    utf8Length(req.body.music_name) > 128 ||
    utf8Length(req.body.music_url) > 128
  ) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> 400 : music_name or music_url is too long`
    );
    return res.status(400).send('music_name or music_url is too long');
  }

  if (
    isNaN(req.body.music_time) ||
    req.body.music_time < 0 ||
    req.body.music_time > 2147483647
  ) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> 400 : music_time is invalid`
    );
    return res.status(400).send('music_time is invalid');
  }

  //check if playlist is users
  let where = { user_id: req.token.id, playlist_id: req.params.playlist_id };
  let result;
  try {
    result = await Playlist.findOne({ where });
  } catch (err) {
    console.log(`[ERROR] /api/playlists/:playlist_id POST -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  if (!result) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> 404 : playlist not found`
    );
    return res.status(404).send('playlist not found');
  }

  //check if user has already has more than 50 musics in the playlist
  where = { playlist_id: req.params.playlist_id };
  let count;
  try {
    count = await Music.count({ where });
  } catch (err) {
    console.log(`[ERROR] /api/playlists/:playlist_id POST -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  if (count >= 50) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> 400 : playlist musics are full`
    );
    return res.status(400).send('playlist musics are full');
  }

  //create music
  const { playlist_id } = req.params;
  const {
    music_name,
    music_url: music_address,
    music_time: music_length,
  } = req.body;
  let musicCreate;
  try {
    musicCreate = await Music.create({
      playlist_id,
      music_name,
      music_address,
      music_length,
    });
  } catch (err) {
    console.log(`[ERROR] /api/playlists/:playlist_id POST -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  if (!musicCreate) {
    console.log(
      `[ERROR] /api/playlists/:playlist_id POST -> 500 : music not created`
    );
    return res.status(500).send('music not created');
  }

  //return created music
  console.log(
    `[SUCCESS] /api/playlists/:playlist_id POST -> 201 : music ${music_name} created`
  );
  return res.status(201).json({ music_id: musicCreate.music_id });
};

module.exports = addMusicsForPlaylist;

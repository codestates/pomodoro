const { Music, Playlist, sequelize } = require('../../models');
require('dotenv').config();

const getAllTags = async (req, res) => {
  const attributes = [
    ['playlist_id', 'tag_id'],
    ['playlist_name', 'tag_name'],
  ];
  const include = [
    {
      model: Music,
      as: 'Musics',
      attributes: [
        ['music_id', 'music_id'],
        ['music_name', 'music_name'],
        ['music_address', 'music_url'],
        ['music_length', 'music_time'],
      ],
    },
  ];
  const where = { user_id: process.env.SYSTEM_USER_ID || 3 };
  let tags;
  try {
    tags = await Playlist.findAll({ attributes, include, where });
  } catch (err) {
    console.log(`[ERROR] /api/tags GET -> 500 : ${err}`);
    return res.status(500).send('Internal Server Error');
  }

  console.log(`[SUCCESS] /api/tags GET -> 200 : tags sent`);
  return res.status(200).json({ result: tags });
};

module.exports = getAllTags;

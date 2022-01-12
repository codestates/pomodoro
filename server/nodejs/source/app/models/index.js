require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config')[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const initModels = () => {
  const Music = require('./Music')(sequelize, DataTypes);
  const Playlist = require('./Playlist')(sequelize, DataTypes);
  const User = require('./User')(sequelize, DataTypes);

  Music.belongsTo(Playlist, { as: 'playlist', foreignKey: 'playlist_id' });
  Playlist.hasMany(Music, { as: 'Musics', foreignKey: 'playlist_id' });
  Playlist.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
  User.hasMany(Playlist, { as: 'Playlists', foreignKey: 'user_id' });

  return {
    Music,
    Playlist,
    User,
    sequelize,
  };
};

module.exports = initModels();

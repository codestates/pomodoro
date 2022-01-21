const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Music',
    {
      music_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      playlist_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Playlist',
          key: 'playlist_id',
        },
      },
      music_name: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      music_address: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      music_length: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Music',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'music_id' }],
        },
        {
          name: 'playlist_id',
          using: 'BTREE',
          fields: [{ name: 'playlist_id' }],
        },
        {
          name: 'user_id',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  );
};

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'User',
    {
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(89),
        allowNull: false,
      },
      pwd_hash: {
        type: DataTypes.CHAR(64),
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      num_pomo: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      pomo_started: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      user_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pending: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'User',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  );
};

module.exports = {
  upload: require('./upload'),
  users: {
    auth: require('./users/auth'),
    get: require('./users/get'),
    post: require('./users/post'),
    patch: require('./users/patch'),
    delete: require('./users/delete'),
  },
  passwords: {
    post: require('./utils/passwords').post,
    patch: require('./utils/passwords').patch,
  },
  nicknames: {
    get: require('./utils/nicknames'),
  },
  mails: {
    get: require('./utils/mails').get,
    post: require('./utils/mails').post,
  },
  playlists: {
    get: require('./playlists/get'),
    post: require('./playlists/post'),
    put: require('./playlists/put'),
    patch: require('./playlists/patch'),
    delete: require('./playlists/delete'),
  },
  music: {
    get: require('./music/get'),
    post: require('./music/post'),
    put: require('./music/put'),
    patch: require('./music/patch'),
    delete: require('./music/delete'),
  },
  pomodoro: {
    post: require('./pomodoro/post'),
    patch: require('./pomodoro/patch'),
  },
  ranks: {
    get: require('./ranks/get'),
  },
};

module.exports = {
  upload: require('./upload'),
  users: {
    login: require('./users/auth'),
    info: require('./users/get'),
    signup: require('./users/post'),
    modify: require('./users/patch'),
    delete: require('./users/delete'),
  },
  passwords: {
    sendAuthMail: require('./utils/passwords').post,
    initPassword: require('./utils/passwords').patch,
  },
  nicknames: {
    checkValued: require('./utils/nicknames'),
  },
  mails: {
    checkValued: require('./utils/mails').get,
    sendAuthMail: require('./utils/mails').post,
    pendingUpdate: require('./utils/mails').patch,
  },
  playlists: {
    info: require('./playlists/get'),
    addItem: require('./playlists/post'),
    orderChange: require('./playlists/put'),
    modifyName: require('./playlists/patch'),
    delete: require('./playlists/delete'),
  },
  music: {
    info: require('./music/get'),
    addItem: require('./music/post'),
    orderChange: require('./music/put'),
    modifyName: require('./music/patch'),
    delete: require('./music/delete'),
  },
  pomodoro: {
    start: require('./pomodoro/post'),
    end: require('./pomodoro/patch'),
  },
  ranks: {
    info: require('./ranks/get'),
  },
  search: {
    get: require('./search/get'),
  },
  tags: {
    get: require('./tags/get'),
  },
  youtube: {
    saveMusicAndThumbnail: require('./youtube/post'),
  },
};

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { tokenParser } = require('./app/controller/utils/tokenFunctions');
const methodOverride = require('method-override');
let app, readFileSync, http2Express, http2, options;

//=========================================================
// HTTP Version check
//=========================================================
if (process.env.HTTP_VERSION === 1.1) app = express();
else {
  readFileSync = require('fs').readFileSync;
  http2Express = require('http2-express-bridge');
  http2 = require('http2');
  app = http2Express(express);
  options = {
    key: readFileSync('/etc/nginx/cert/key.pem'),
    cert: readFileSync('/etc/nginx/cert/cert.pem'),
    allowHTTP1: true,
  };
}

//=========================================================
// Security First
//=========================================================
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

//=========================================================
// Cookie and body and token parser
//=========================================================
app.use(tokenParser());
app.use(cookieParser());
app.use(express.json({ limit: '100mb' })); //{ "message" : "ok" }
app.use(express.urlencoded({ limit: '100mb', extended: true })); //message=ok
// html form method Parser (PATCH , DELETE , PUT)
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//=========================================================
// Main Logger
//=========================================================
app.use((req, res, next) => {
  const time = new Date();
  const logCookie = Object.keys(req['cookies']).length ? 'cookie ' : '';
  const logBody = Object.keys(req.body).length ? ' body' : '';
  const logToken = req.header('Authorization') ? ' token ' : '';
  const logPwd = req.header('X-password') ? ' pwd ' : '';

  console.log(
    `[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] ${req.ip} ${
      req.method
    } -(${logCookie}${logBody}${logToken}${logPwd})- ${req.url}`
  );
  if (Object.keys(req['cookies']).length) console.dir(req.cookies);
  if (Object.keys(req['query']).length) console.dir(req.query);
  if (Object.keys(req['body']).length) console.dir(req.body);
  if (logToken) console.dir(req.token);
  next();
});

//=========================================================
// CORS Policy
//=========================================================
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

//=========================================================
// Current SERVER MODE
//=========================================================
const PREFIX = '/dev'; // 'api' or 'dev'
const point = (URL) => `${PREFIX}${URL}`;

//=========================================================
// MVC pattern - Routes
//=========================================================
const controller = require('./app/controller');
// deployment
app.post(point('/upload'), controller.upload);

//USER
app.post(point('/auth'), controller.users.auth);
app.get(point('/users'), controller.users.get);
app.post(point('/users'), controller.users.post);
app.patch(point('/users'), controller.users.patch);
app.delete(point('/users'), controller.users.delete);

//PASSWORD
app.post(point('/passwords'), controller.passwords.post);
app.patch(point('/passwords'), controller.passwords.patch);

//NICKNAME
app.get(point('/nicknames/:nickname'), controller.nicknames.get);

//MAIL
app.get(point('/mails/:email'), controller.mails.get);
app.post(point('/mails'), controller.mails.post);

//PLAYLIST
app.get(point('/playlists'), controller.playlists.get);
app.post(point('/playlists'), controller.playlists.post);
app.put(point('/playlists'), controller.playlists.put);
app.patch(point('/playlists/:playlist_id'), controller.playlists.patch);
app.delete(point('/playlists/:playlist_id'), controller.playlists.delete);

//PLAYLIST
app.get(point('/playlists/:playlist_id'), controller.music.get);
app.post(point('/playlists/:playlist_id'), controller.music.post);
app.put(point('/playlists/:playlist_id'), controller.music.put);
app.patch(point('/playlists/:playlist_id/:music_id'), controller.music.patch);
app.delete(point('/playlists/:playlist_id/:music_id'), controller.music.delete);

//POMODORO
app.post(point('/pomodoro'), controller.pomodoro.post);
app.patch(point('/pomodoro'), controller.pomodoro.patch);

//RANK
app.get(point('/ranks'), controller.ranks.get);

//=========================================================
//Not Found : show Available routes
//=========================================================
app.use((err, req, res, next) => {
  if (err) {
    const time = new Date();
    const logCookie = Object.keys(req['cookies']).length ? 'cookie ' : '';
    const logBody = Object.keys(req.body).length ? ' body' : '';
    const logToken = req.header('Authorization') ? ' token ' : '';
    const logPwd = req.header('X-password') ? ' pwd ' : '';

    console.log(
      `[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] ${req.ip} ${
        req.method
      } -(${logCookie}${logBody}${logToken}${logPwd})- ${
        req.url
      } [ERROR OCCURED] `
    );
    if (Object.keys(req['cookies']).length) console.dir(req.cookies);
    if (Object.keys(req['query']).length) console.dir(req.query);
    if (Object.keys(req['body']).length) console.dir(req.body);
    if (logToken) console.dir(req.token);
    console.dir(err.type);
    return res.status(500).send('Internal Server Error');
  }
  return res.status(404).send('404 Not Found');
});

//=========================================================
// HTTP Version check
//=========================================================
if (process.env.HTTP_VERSION === 1.1) {
  app.listen(3333, () => {
    console.log('HTTP/1.1 Server is running on port 3333');
  });
} else {
  const server = http2.createSecureServer(options, app);
  server.listen(3333, () => {
    console.log('HTTP/2.0 Server is running on port 3333');
  });
}

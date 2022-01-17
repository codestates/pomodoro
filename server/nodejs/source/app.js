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
const PREFIX = '/api'; // 'api' or 'dev'
const point = (URL) => `${PREFIX}${URL}`;

//=========================================================
// MVC pattern - Routes
//=========================================================
const auth = require('./app/router/auth');
const users = require('./app/router/users');
const password = require('./app/router/passwords');
const nickname = require('./app/router/nicknames');
const mail = require('./app/router/mails');
const playlist = require('./app/router/playlists');
const music = require('./app/router/music');
const pomodoro = require('./app/router/pomodoro');
const rank = require('./app/router/ranks');
const search = require('./app/router/search');
const tags = require('./app/router/tags');

app.use(point('/auth'), auth);
app.use(point('/users'), users);
app.use(point('/passwords'), password);
app.use(point('/nicknames'), nickname);
app.use(point('/mails'), mail);
app.use(point('/playlists'), playlist);
app.use(point('/playlists/:playlist_id'), music);
app.use(point('/pomodoro'), pomodoro);
app.use(point('/ranks'), rank);
app.use(point('/search'), search);
app.use(point('/tags'), tags);

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

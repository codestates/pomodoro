import bodyParser from './utils/bodyParser.js';
import dummyDB from './dummies.js';

const dummy = (req, res) => {
  // ======================================================
  // default function wrapper for the njs -> express conversion
  // ======================================================
  const console = req; //console functions
  const process_env = req.variables; //dotenv : declare with js_var $VARIABLE value;
  req.rawbody = bodyParser(req); //bodyparser for token evaluation
  try {
    req.body = req.rawbody ? JSON.parse(req.rawbody) : {}; //bodyparser
  } catch (e) {
    req.body = require('querystring').parse(req.rawbody);
  }
  res = {
    status: (code) => {
      return {
        send: (data) => {
          req.headersOut['Content-Type'] = 'text/plain; charset=utf-8';
          req.return(code, data);
        },
        json: (data) => {
          req.headersOut['Content-Type'] = 'application/json; charset=utf-8';
          req.return(code, JSON.stringify(data));
        },
      };
    },
    end: req.finish,
    append: (key, value) => {
      req.headersOut[key] = value;
    },
  };
  req.header = (name) => {
    return req.headersIn[name];
  };
  req.ip = req.remoteAddress;
  req.cookies = require('querystring').parse(
    req.headersIn['Cookie'],
    '; ',
    '='
  );
  req.path = req.uri;
  req.url = req.uri;
  req.query = req.args;
  console.dir = function (obj) {
    console.log(typeof obj === 'object' ? JSON.stringify(obj) : obj);
  };
  // ======================================================

  //console.log(`req.header('Cookie') = ${JSON.stringify(req.cookies)}`);
  console.log(
    `[DUMMY] ${req.ip} ${req.method} -( ${
      Object.keys(req['cookies']).length ? 'cookie ' : ''
    } ${Object.keys(req['body']).length ? 'body' : ''})- ${req.url}`
  );
  if (Object.keys(req['cookies']).length) console.dir(req.cookies);
  if (Object.keys(req['query']).length) console.dir(req.query);
  if (Object.keys(req['body']).length) console.dir(req.body);

  let referrer = req.header('origin');
  // let referrer = req.header('Referer');
  // if (referrer && referrer[referrer.length - 1] === '/')
  //   referrer = referrer.slice(0, -1);

  if (req.method === 'OPTIONS') {
    res.append('Access-Control-Allow-Origin', referrer);
    res.append(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );
    res.append('access-control-allow-credentials', 'true');
    res.append('Access-Control-Allow-Headers', 'content-type');
    res.append('Access-Control-Max-Age', '86400');
    return res.status(204).send();
  }

  const PREFIX = '/' + req.url.split('/')[1]; //or '/dummy'
  if (
    !dummyDB.some((dummyInfo) => {
      const METHOD = dummyInfo[0],
        PATH = dummyInfo[1],
        STATUSCODE = dummyInfo[2],
        HEADER = dummyInfo[3],
        RETURN = dummyInfo[4];
      if (PREFIX + PATH === req.path && METHOD === req.method) {
        console.log(`[DUMMY] caught ${METHOD} ${PATH}. sent ${STATUSCODE}`);
        if (HEADER) res.append(HEADER[0], HEADER[1]);
        res.append('Access-Control-Allow-Origin', referrer);
        res.append('access-control-allow-credentials', 'true');
        res.status(STATUSCODE).json(RETURN);
        return true;
      }
    })
  ) {
    res.append('Access-Control-Allow-Origin', referrer);
    res.status(404).send('Dummy : Not found');
  }
};

export default { dummy };

const crypto = require('crypto');
const fs = require('fs');
import bodyParser from './utils/bodyParser.js';

const start = (req, res) => {
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

  //standard logger
  console.log(`[GITHUB Webhook] ${req.remoteAddress} ${req.method} ${req.uri}`);

  //check if the request is from github
  let token = req.header('X-Hub-Signature-256');

  if (!token || token.length !== 71 || !req.body) {
    console.error('[GITHUB Webhook] Unauthorized request detected');
    return;
  }
  token = token.split('=')[1];
  const hmac = crypto
    .createHmac('sha256', process_env.GITHUB_SECRET)
    .update(req.rawbody)
    .digest('hex');

  if (hmac !== token) {
    console.error('[GITHUB Webhook] Unauthorized request detected');
    return;
  }

  if (req.header('X-GitHub-Event') !== 'pull_request')
    return res.status(200).send('njx NOT OK');
  if (req.body.pull_request.base.repo.id != process_env.GITHUB_REPO_ID)
    return res.status(200).send('njx NOT OK');
  if (req.body.pull_request.merged == false)
    return res.status(200).send('njx NOT OK');

  console.log(
    `id_reference: ${process_env.GITHUB_REPO_ID}, id: ${req.body.pull_request.base.repo.id}`
  );
  console.log(
    `branch: ${req.body.pull_request.base.ref}, merged: ${req.body.pull_request.merged}`
  );

  //req.body.pull_request.base.repo.id
  //req.body.pull_request.base.ref  <- req.body.pull_request.head.ref
  //req.body.pull_request.base.repo.html_url
  const CWD = process_env.CURRENT_WORKING_DIRECTORY;
  console.log(`cwd = ${CWD}`);
  fs.writeFileSync(
    `${CWD}/.repo`,
    'git@github.com:' + req.body.pull_request.base.repo.full_name
  );

  switch (req.body.pull_request.base.ref) {
    case 'main':
      console.log(
        '[GITHUB Webhook] Client/Server main branch deployment started'
      );
      fs.writeFileSync(`${CWD}/client/main`, process_env.GITHUB_DEPLOY_CLIENT);
      fs.writeFileSync(`${CWD}/server/main`, process_env.GITHUB_DEPLOY_SERVER);
      break;
    case 'dev-front': //'dev-front'
      console.log('[GITHUB Webhook] Client dev branch deployment started');
      fs.writeFileSync(
        `${CWD}/client/dev-front`,
        process_env.GITHUB_DEPLOY_CLIENT
      );
      break;
    case 'dev-back':
      console.log('[GITHUB Webhook] Server dev-back branch deployment started');
      fs.writeFileSync(
        `${CWD}/server/dev-back`,
        process_env.GITHUB_DEPLOY_SERVER
      );
      break;
  }

  res.status(200).send('njx OK');
};

export default { start };

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
req.cookies = require('querystring').parse(req.headersIn['Cookie'], '; ', '=');
req.path = req.uri;
req.url = req.uri;
req.query = req.args;
console.dir = function (obj) {
  console.log(typeof obj === 'object' ? JSON.stringify(obj) : obj);
};
// ======================================================

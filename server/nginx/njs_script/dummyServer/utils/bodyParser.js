const fs = require('fs');

const bodyParser = (req) => {
  let rawbody;
  try {
    rawbody = req.requestText;
  } catch (e) {
    try {
      rawbody = fs.readFileSync(req.variables.request_body_file, 'utf8');
    } catch (e) {
      req.error(e);
      req.error(njs.dump(e));
    }
  }
  return rawbody;
};

export default bodyParser;

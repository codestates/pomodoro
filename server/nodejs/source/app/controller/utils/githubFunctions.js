const crypto = require('crypto');
require('dotenv').config();

module.exports = {
  verifyIntegrity: function (req) {
    const token = req.header('X-Hub-Signature-256')?.split('=')[1];
    if (!token || token.length !== 64) return false;
    if (Object.keys(req['body']).length === 0) return false;
    const hmac = crypto
      .createHmac('sha256', process.env.GITHUB_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex');
    return hmac === token;
  },
};

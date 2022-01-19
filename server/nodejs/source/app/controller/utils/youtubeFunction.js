const imgUrlDownload = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    if (err) throw err;
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

module.exports = imgUrlDownload;

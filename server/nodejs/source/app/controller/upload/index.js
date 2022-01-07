module.exports = async (req, res) => {
  res.status(200).send('not allowed right now');
};

// const multer = require('multer');
// const upload = multer({ dest: '/html/images' });
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   console.log('file upload success');
//   console.dir(req.file);
//   res.status(200).send('file uploaded');
// });

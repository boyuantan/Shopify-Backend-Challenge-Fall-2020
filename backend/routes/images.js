const router = require('express').Router();
const jwt = require('jsonwebtoken');

let Image = require('../models/image.model');

require('dotenv').config();

const jwtKey = process.env.JWT_PRIVATE_KEY;

router.route('/').get((req, res) => {
  console.log(req.headers);
  const token = req.cookies.token;
  console.log("cookies: ", req.cookies);
  if (token) {
    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      console.log("Didn't work: ", e);
    }

    console.log("user details: ", payload);
  } else {
    console.log("NO TOKEN FOUND");
  }

  // const gfs = req.app.locals.gfs;
  // gfs.files.find().toArray((err, files) => {
  //   // Check if file
  //   if (!files || files.length == 0) {
  //     return res.send([]);  // Send empty array
  //   }
  //
  //   const fnames = files.map(file => file.filename);
  //   return res.send(fnames);
  // });
});

router.route('/:filename').get((req, res) => {
  const gfs = req.app.locals.gfs;
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length == 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});

router.route('/').post((req, res) => {
  const upload = req.app.locals.upload.single('img');
  upload(req, res, (err) => {
    res.send(req.files);
  });
});

module.exports = router;

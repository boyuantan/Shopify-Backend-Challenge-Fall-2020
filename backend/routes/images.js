const router = require('express').Router();
const jwt = require('jsonwebtoken');

let Image = require('../models/image.model');
let BlacklistToken = require('../models/blacklist.model');

require('dotenv').config();

const jwtKey = process.env.JWT_PRIVATE_KEY;

function getTokenPayload(req, callback) {
  const token = req.cookies.token;
  if (!token) {
    callback(null);
    return;
  }

  BlacklistToken.findOne({ token: token }, (err, blacklistToken) => {
    if (blacklistToken || err) {
      callback(null);  // Error or token blacklisted
      return;
    }

    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      callback(null);
      return;
    }

    callback(payload);
  });
}

router.route('/').get((req, res) => {
  getTokenPayload(req, (payload) => {
    // console.log("Got payload: ", payload);
    var query = [{ isPrivate: false }];
    if (payload) {
      query.push({ username: payload.username });
    }

    Image.find().or(query)
      .then(images => {
        var fnames = [];
        if (images) {
          fnames = images.map(image => image.filename);
        }

        return res.send(fnames);
      })
      .catch(err => {
        return res.status(500).json({ err: err });
      });
  });
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
  // Not atomic
  const upload = req.app.locals.upload.single('img');
  var username = '';
  var isPrivate = false;

  getTokenPayload(req, (payload) => {
    if (payload) {
      username = payload.username;
      isPrivate = true; // TODO: Add field to request body
    }

    upload(req, res, (err) => {
      console.log(req.file);
      // Upload info about same image to Image repo
      const newImage = new Image({
        username: username,
        fileId: req.file.id,
        filename: req.file.filename,
        isPrivate: isPrivate,
      });

      newImage.save()
        .then(() => res.json('Image added!'))
        .catch(err => res.status(500).json('Error: ' + err));
    });
  });
  
  // payload = getTokenPayload(req);
  // if (payload) {
  //   username = payload.username;
  //   isPrivate = true; // TODO: Add field to request body
  // }
  //
  // upload(req, res, (err) => {
  //   console.log(req.file);
  //   // Upload info about same image to Image repo
  //   const newImage = new Image({
  //     username: username,
  //     fileId: req.file.id,
  //     filename: req.file.filename,
  //     isPrivate: isPrivate,
  //   });
  //
  //   newImage.save()
  //     .then(() => res.json('Image added!'))
  //     .catch(err => res.status(500).json('Error: ' + err));
  // });
});

module.exports = router;

const router = require('express').Router();

router.route('/').get((req, res) => {
  const gfs = req.app.locals.gfs;
  gfs.files.find().toArray((err, files) => {
    // Check if file
    if (!files || files.length == 0) {
      return res.send([]);  // Send empty array
    }

    const fnames = files.map(file => file.filename);
    return res.send(fnames);
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

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// const del = require('del');
const saveFileInfo = require('../service/node_reade_write_json');
// (async () => {
//   try {
//     const deletedPaths = await del(['public/loads/**', '!public/loads']);
//     console.log('Deleted files and folders:\n', deletedPaths.join('\n'));
//   } catch (error) {
//     console.error('delete file program has crached :', error);
//   }
// })();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/loads')
  },
  filename: function (req,file,cb) {
    cb(null,file.originalname)
  }
  // filename: function (req, file, cb) {
  //   //console.log(file.mimetype);
  //   let customFileName = crypto.randomBytes(8).toString('hex')
  //   cb(null, customFileName + "-" + Date.now() + '.' + extentionFinder(file.originalname))
  // }
});
var upload = multer({ storage: storage });

router.post('/files', upload.single('converted'), (req, res) => {
  console.log('route Ok');
  const rootDir = path.dirname(require.main.filename);
  let name = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.')),
    fileName = req.file.filename,
    newFileName = fileName.substring(0,fileName.lastIndexOf('.'));
    output = rootDir + "/public/loads/" + name + '.html',
    extention = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'), req.file.originalname.length),
    fileInfo = {
      src: req.file.path,
      originName: req.file.originalname,
      name: name,
      extention: extention,
      fileName: fileName.toString(),
      output: output
    }

  let doc2 = saveFileInfo(fileInfo);
  doc2().then(contentHtml => {
    console.log("node sending data :", typeof contentHtml);
    res.status(200).send(contentHtml);

  });
});

module.exports = router;
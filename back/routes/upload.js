const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './tmp,', limits: { fileSize: 3000 } });
const db = require('../helpers/db');
const fs = require('fs');
const async = require('async');

router.post('/', upload.array('monfichier[]'), function (req, res, next) {
  async.map(req.files, file => fs.rename(file.path, 'public/images/' + file.originalname), function (error, results) {
    // error est renseigné si une erreur s'est produite sur au moins un des rename
    if (error) {
      return res.status(500).json({ error: err.message });
    }
    // results est un tableau contenant le résultat de chaque opération de rename.
    return res.status(200).send(results)
  });
})

// Version avec un seul fichier envoyé
// router.post('/', upload.single('monfichier'), function (req, res, next) {
//   fs.rename(req.file.path, 'public/images/' + req.file.originalname, function (err) {
//     if (err) {
//       res.send('Problème durant le déplacement');
//     } else {
//       db.query('INSERT INTO upload (file) VALUES (?)', ['public/images/' + req.file.originalname], function (error, results, fields) {
//         console.log('public/images/' + req.file.originalname)
//         if (error) {
//           return res.status(500).send('Le fichier n\'a pas pu être ajouté à la base de données')
//         }
//         return res.send('Fichier uploadé et a ajouté à la base de donnéesavec succès');
//       })
//     }
//   });
// })

module.exports = router;
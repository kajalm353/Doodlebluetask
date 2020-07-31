var express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const product = require('../models/Product')
const multer = require('multer');
const xlsxj = require("xlsx-to-json");
const Products = require('../models/Product');

const upload = multer({ dest: 'tmp/csv/', limits: { fileSize: 1000000 } });



//@upload product api    --PUT api

router.post('/upload',auth, upload.single('files'), async (req, res) => {
  try {
        console.log(req.file);

    if (req.file.path) {
      let updated = []
      let inserted = []
      let totalProductCount = await Products.count()
      xlsxj({
        input: req.file.path,
        output: 'ds'
      }, async (err, result) => {
        // if(result.length <=1 ) {
        //   return res.send({message: 'File is corrupted'})
        // }

        if (err) {

          return res.status(500).send(err)
        }

        await asyncForEach(result, async (ele) => {
          if (isEmpty(ele)) {
            return res.status(500).send({ message: 'File is corrupted' })
          }
          replaceKeys(ele)
          ele.UserId = req.user._id
          let data = await Products.findOne({
            UserId: ele.UserId, Name: ele.Name, Price: ele.Price, productImageUrl: ele.productImageUrl
          })

          if (data) {

            let update = await Products.updateOne({ _id: data._id }, {
              $set: {
                Name: ele.Name,
                Price: ele.Price,
                productImageUrl: ele.productImageUrl,
              }
            })
            updated.push(update)
          } else {
            inserted.push(ele)
          }
        })
        await Products.insertMany(inserted)
        var obj = {
          DuplicateDiscardedProduct: updated.length,
          NewlyAddedProduct: inserted.length,
          PreviousProductsTotal: totalProductCount,
        };
        // console.log(obj);

        res.status(200).send(obj)
      });
    } else {
      res.status(500).send('File is Not Exist')
    }
  } catch (e) {
    console.log(e);

    res.status(500).send({
      message: 'Internal Server Error'
    })
  }
})

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}




async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function replaceKeys(object) {
  Object.keys(object).forEach(function (key) {
    var newKey = key.replace(/[%()]/g, '');
    newKey = newKey.trim()
    newKey = newKey.replace(/[\s+]/g, '_');
    if (key !== newKey) {
      object[newKey] = object[key];
      delete object[key];
    }
  });
}



module.exports = router
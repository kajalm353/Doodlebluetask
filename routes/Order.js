var express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const orders = require("../models/Order");
const products = require("../models/Product");
const users = require("../models/Users");
var mongoose = require("mongoose");




//@create order    --POST api


router.post('/', auth, async (req, res) => {
  try {
    const order = new orders({
      userId: req.user._id,
      productId: req.body.productId,
      Quantity: req.body.Quantity,
    });
    await order.save();
    res.status(200).send(order);
  } catch (e) {
    // console.log(e);

    res.send(e);
  }
});

//@update order    --PUT api

router.put('/updateOrder', auth, async (req, res) => {
  try {
    if (!req.query.orderId) {
      return res.status(500).send("orderId required");
    }
    let updateorders = await orders.findOneAndUpdate(
      { _id: req.query.orderId },
      { $set: req.body },
      { new: true }
    );

    res.status(200).send(updateorders);
  } catch (e) {
    res.send(e);
  }
});




//@cancel order       --DELETE api

router.delete('/Cancel', auth, async (req, res) => {
  try {
    if (req.query.orderId) {
      await orders.findOneAndDelete({ _id: req.query.orderId });
      res.status(200).send({ message: "order Deleted" });
    } else {
      res.status(422).send("orderId required");
    }
  } catch (error) {
    res.send(error);
  }
});


//fetching product data based on user id in header token   --GET api
router.get('/fetchingproductdata', auth, async (req, res) => {
  try {
    // console.log(req.user);
  
      const userProducts = await orders.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(req.user._id) },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product_docs",
          },
        },
      ]);
      console.log("sssssssssss", userProducts);
      res.send(userProducts)
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
});


//@getproductcount based on date    --GET api

router.get('/getproductcount',auth, async(req,res) => {
  try {


    let result = await orders.find({createdOn: new Date(req.query.createdOn) }).count()

res.status(200).send(result)    
  } catch (error) {
    console.log(error);
    res.send(error);

  }
})

module.exports = router;

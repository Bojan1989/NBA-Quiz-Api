const mongoose = require("mongoose");
const Score = require("../models/score");

exports.scores_get_all = (req, res, next) => {

  const page = parseInt(req.query.page);
  const perPage = parseInt(req.query.pageSize);

  Score.find()
    .sort({score: -1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec()
    .then(docs => {
      const response =
        docs.map(doc => {
          return {
            username: doc.username,
            score: doc.score,
          };
        })

      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.scores_getUser_score = (req, res, next) => {

  const page = parseInt(req.query.page);
  const perPage = parseInt(req.query.pageSize);

  Score.find({username: req.headers.user})
    .sort({score: -1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec()
    .then(docs => {
      const response =
        docs.map(doc => {
          return {
            username: doc.username,
            score: doc.score,
          };
        })

      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.score_add_score = (req, res, next) => {
  const score = new Score({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    score: req.body.score,
  });
  score
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Score added successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// exports.products_get_product = (req, res, next) => {
//   const id = req.params.productId;
//   Product.findById(id)
//     .select("name price _id productImage")
//     .exec()
//     .then(doc => {
//       console.log("From database", doc);
//       if (doc) {
//         res.status(200).json({
//           product: doc,
//           request: {
//             type: "GET",
//             url: "http://localhost:3000/products"
//           }
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// };
//
// exports.products_update_product = (req, res, next) => {
//   const id = req.params.productId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   Product.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "Product updated",
//         request: {
//           type: "GET",
//           url: "http://localhost:3000/products/" + id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };
//
// exports.products_delete = (req, res, next) => {
//   const id = req.params.productId;
//   Product.remove({ _id: id })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "Product deleted",
//         request: {
//           type: "POST",
//           url: "http://localhost:3000/products",
//           body: { name: "String", price: "Number" }
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };

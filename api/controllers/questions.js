const mongoose = require("mongoose");

const Question = require("../models/question");

exports.questions_get_all = (req, res, next) => {
  Question.find()
    .select("_id question answer options")
    .exec()
    .then(docs => {
      res.status(200).json({
        questions: docs.map(doc => {
          return {
            _id: doc._id,
            question: doc.question,
            answer: doc.answer,
            options: doc.options
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.questions_create_question = (req, res, next) => {
  const question = new Question({
    _id: new mongoose.Types.ObjectId(),
    question: req.body.question,
    answer: req.body.answer,
    options: req.body.options
  });
  question
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Question added successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.questions_delete_question = (req, res, next) => {
  Question.remove({ _id: req.params._id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Question deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// exports.orders_get_order = (req, res, next) => {
//   Order.findById(req.params.orderId)
//     .populate("product")
//     .exec()
//     .then(order => {
//       if (!order) {
//         return res.status(404).json({
//           message: "Order not found"
//         });
//       }
//       res.status(200).json({
//         order: order,
//         request: {
//           type: "GET",
//           url: "http://localhost:3000/orders"
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// };
//

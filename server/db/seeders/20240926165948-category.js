
'use strict';

const user_type = require("../models/user_type");

module.exports = {
  up: (models, mongoose) => {
    return models.user_type.insertMany([
      {
        _id: "66f59426295703d8400d9789",
        user_type: "admin"
      }
    ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
    return models.user_type.deleteMany({
      _id: {
        $in: [
          "66f59426295703d8400d9789",
        ]
      }
    }).then(res => {
      // Prints "1"
      console.log("rolling back");
      console.log(res.deletedCount);
    });
  }
};

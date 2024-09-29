const category = require('../models/category');

'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      return models.category.insertMany([
        {
          _id : "66f6ae201fc16e65e2df7dc5",
          category : "comedy"
        },
        {
          _id : "66f6c656b179615cb37553f2",
          category : "Horror"
        },
        {
          _id : "66f6c661b179615cb37553f3",
          category : "Sfi-ci"
        },
        {
          _id : "66f6c670b179615cb37553f4",
          category : "Adventure"
        },{
          _id : "66f6c67db179615cb37553f5",
          category : "Triller"
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {


      return models.category.deleteMany({
        _id : {
          $in :[
            "66f6ae201fc16e65e2df7dc5",
            "66f6c656b179615cb37553f2",
            "66f6c661b179615cb37553f3",
            "66f6c670b179615cb37553f4",
            "66f6c67db179615cb37553f5",
          ]
        }
      }
     
      ).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};

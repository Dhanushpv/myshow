
const language = require ('../models/language');

'use strict';

module.exports = {
  up: (models, mongoose) => {
    
     
      return models.language.insertMany([
        {
          _id : "66f6c35a3f107ec327b1fa0a",
          language : "Malayalam"
        },

        {
          _id : "66f6c51bb179615cb37553ec",
          language : "Hindi"
        },

        {
          _id : "66f6c670b179615cb37553f4",
          language : "English"
        },

        {
          _id : "66f6c536b179615cb37553ee",
          language : "Kanada"
        },

        {
          _id : "66f6c544b179615cb37553ef",
          language : "Tamil"
        },


      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });

  },

  down: (models, mongoose) => {
    
    
      return models.language.deleteMany({
        _id : {
          $in :[
            "66f6c35a3f107ec327b1fa0a",
            "66f6c51bb179615cb37553ec",
            "66f6c529b179615cb37553ed",
            "66f6c536b179615cb37553ee",
            "66f6c544b179615cb37553ef",

          ]
        }
      }
       
      ).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  
  }
};

     const dayjs = require('dayjs');
    let users = require('../db/models/user')
    const { success_function, error_function } = require('../util/responsehandler');
    const fileUpload = require('../util/uploads').fileUpload;
    const category = require('../db/models/category');
    const language = require('../db/models/language');


    exports.createPost = async function (req, res) {
        try {
            let body = req.body;
            console.log("body", body);
    
            let image = req.body.image;
            console.log("image : ", image);
    
            let body_category = body.category;
            console.log("category", body_category);
    
            // Find category
            let category_match = await category.findOne({ category : body.category });
            console.log("category_match", category_match);

            let body_language = body.language;
            console.log("body_language",body_language);

            let language_match = await language.findOne({language :body_language});
             
            let language_id = language_match._id;

            body.language= language_id

            // Get category ID
            let id = category_match._id;
            body.category = id;
    
           
    
            // Handle image upload
            if (image) {
                let image_path = await fileUpload(image, "users");
                console.log("image_path", image_path);
                body.image = image_path;
                        }

                        
                // Create user
                let new_show = await users.create(body);
                console.log("new_show", new_show);
                        // Send success response
            let response = success_function({
                success: true,
                statuscode: 200,
                message: "Successfully added",
            });
            res.status(response.statuscode).send(response);
            return;
        } catch (error) {
            console.log("error : ", error);
            let response = error_function({
                success: false,
                statuscode: 400,
                message: "Error occurred"
            });
            res.status(response.statuscode).send(response);
            return;
        }
    }
    
    exports.getAll = async function (req,res){

        try {
            
            
            let getData = await users.find().populate('category').populate('language');
            console.log("getData",getData);

            let response = success_function({
                success  : true,
                statuscode : 200,
                message :"successfully added",
                data : getData
            });
            res.status(response.statuscode).send(response)
            return;
        } catch (error) {
            
            console.log("error : ", error);
            let response = error_function({
                success: false,
                statuscode: 400,
                message: "error"
               
            })
            res.status(response.statuscode).send(response)
            return;
            
        }
    }

    exports.singleData = async function (req,res){

        try {
            
            let body = req.params.id;
            console.log("body",body);

            let singleData = await users.findOne({_id:body});
            console.log("singleData : ", singleData);

            let response = success_function({
                success  : true,
                statuscode : 200,
                message :"successfully added",
                data : singleData
            });
            res.status(response.statuscode).send(response)
            return;
        } catch (error) {
            
            console.log("error : ", error);
            let response = error_function({
                success: false,
                statuscode: 400,
                message: "error"
            })
            res.status(response.statuscode).send(response)
            return;
            
        }
    }

    exports.updateData = async function (req,res){

    try {

        let body = req.body
        console.log("body",body);

        let id = req.params.id;
        console.log("id",id);

        let image = body.image;
        console.log("image",image);

        const regexp =/^data:/;
        const result = regexp.test(image);

        if (result===true) {
            let image_path = await fileUpload(image, "users");
            console.log("image_path", image_path);
            body.image = image_path;
        }

          // Find category
          let category_match = await category.findOne({ category : body.category });
          console.log("category_match", category_match);

          let body_language = body.language;
          console.log("body_language",body_language);

          let language_match = await language.findOne({language :body_language});
           
          let language_id = language_match._id;

          body.language= language_id

          // Get category ID
          let ids = category_match._id;
          body.category = ids;


        let updateData = await users.updateOne({ _id: id },{ $set: body }).populate('category').populate('language');
        console.log("updateData",updateData);

        let response = success_function({
            success  : true,
            statuscode : 200,
            message :"successfully added",
        });
        res.status(response.statuscode).send(response)
        return;
        } catch (error) {
            
            console.log("error : ", error);
            let response = error_function({
                success: false,
                statuscode: 400,
                message: "error"
            })
            res.status(response.statuscode).send(response)
            return;
            
        }
    }

    exports.deleteData = async function (req,res){

        try {

            let body = req.params.id;
            console.log("body",body);

            let deleteData = await users.deleteOne({_id : body});
            console.log("deleteData",deleteData);

            let response = success_function({
                success  : true,
                statuscode : 200,
                message :"successfully added",
            });
            res.status(response.statuscode).send(response)
            return;
        } catch (error) {
            
            console.log("error : ", error);
            let response = error_function({
                success: false,
                statuscode: 400,
                message: "error"
            })
            res.status(response.statuscode).send(response)
            return;
        }
    }

    exports.filterdata = async function (req,res){
        let query = req.query

       try {
        if(query.category && query.language){

            let  category_filter = await category.findOne ({category : query.category})
            console.log("category_filter",category_filter);

            let language_filter = await language.findOne ({language : query.language})
            console.log("language_filter",language_filter);


            let cat_id = category_filter._id;
            console.log("cat_id : ",cat_id);
            let lan_id = language_filter._id;
            console.log("lan_id : ",lan_id);



            // let match_id = await users.find({category : cat_id, language : lan_id}).populate('category').populate('language')
            // console.log("match_id : ",match_id);

            let match_id = await users.find({category: cat_id, language: lan_id});
            console.log("Raw match_id:", match_id);
           



            let response = success_function({
                success: true,
                statuscode: 200,
                message: "successfully filtered by both language and category",
                data: match_id
            });
    
            res.status(response.statuscode).send(response);
            return;

        }else if(query.category){

            let  category_filter = await category.findOne ({category : query.category})
            console.log("category_filter",category_filter);

            let id =  category_filter._id;
            console.log("id",id);

            let category_match = await users.find({ category: id }).populate('category');
            console.log('category_match', category_match);

            
            let response = success_function({
                success: true,
                statuscode: 200,
                message: "successfully filtered  category",
                data: category_match
            });
    
            res.status(response.statuscode).send(response);
            return;
    
        }else if(query.language){

            let  language_filter = await language.findOne({language : query.language})
            console.log("language_filter",language_filter);

            let id =  language_filter._id;
            console.log("id",id);

            let language_match = await users.find({ language: id }).populate('language');
            console.log('language_match', language_match);

            
            let response = success_function({
                success: true,
                statuscode: 200,
                message: "successfully filtered  language",
                data: language_match
            });
    
            res.status(response.statuscode).send(response);
            return;
    
        }

       } catch (error) {
        console.log("error while filtering", error);

        let response = error_function({
            success: false,
            statuscode: 400,
            message: "failed"
        });

        res.status(response.statuscode).send(response);
        return;
    }

}


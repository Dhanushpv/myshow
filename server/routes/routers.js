const express = require('express');
const router =express.Router();
const usercontroller = require('../controllers/userController');

router.post('/movie',usercontroller.createPost);
router.get('/movie',usercontroller.getAll);
router.get('/movies/:id',usercontroller.singleData);
router.put('/movie/:id',usercontroller.updateData);
router.delete('/movie/:id',usercontroller.deleteData);

router.get('/language',usercontroller.languageSelector);


// router.get('/filter',usercontroller.filterdata)


module.exports=router
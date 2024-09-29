const express = require('express');
const router =express.Router();
const usercontroller = require('../controllers/userController');

router.post('/user',usercontroller.createPost);
router.get('/user',usercontroller.getAll);
router.get('/users/:id',usercontroller.singleData);
router.put('/updateData/:id',usercontroller.updateData);
router.delete('/delete/:id',usercontroller.deleteData);

router.get('/filter',usercontroller.filterdata)


module.exports=router
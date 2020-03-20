const express = require('express');
const router = express.Router();
const itemCtrl = require('../controllers/item');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', itemCtrl.getAllItems);
router.get('/:id', itemCtrl.getOneItem);
router.post('/', auth, multer, itemCtrl.createItem);
router.put('/:id', auth, multer, itemCtrl.modifyItem);
router.delete('/:id', auth, itemCtrl.deleteItem);

module.exports = router;
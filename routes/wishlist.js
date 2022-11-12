const express = require('express');
const router = express.Router();

const wishlistHandler = require('./handler/wishlist')

const verifyToken = require('../middleware/authMiddleware');

router.get('/',  verifyToken, wishlistHandler.wishlist);
router.delete('/:id', verifyToken, wishlistHandler.destroy);

module.exports = router;

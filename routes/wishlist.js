const express = require('express');
const router = express.Router();

const wishlistHandler = require('./handler/wishlist')

router.get('/', wishlistHandler.wishlist);
router.delete('/:id', wishlistHandler.destroy);

module.exports = router;

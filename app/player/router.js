const express = require('express');
const router = express.Router();
const { isLoginPlayer } = require('../middleware/auth');
const { landingPage, detailPage, category, checkout } = require('./controller');

router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);

module.exports = router;

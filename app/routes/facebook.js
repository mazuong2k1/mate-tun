const express = require('express');
const router = express.Router();

const { getSearchAds, searchAds } = require('../controllers/facebook')

router.post('/search_ads', searchAds)
router.post('/get_search_ads', getSearchAds)

module.exports = router;
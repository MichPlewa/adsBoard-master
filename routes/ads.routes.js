const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdController.getAllAds);
router.get('/ads/:id', AdController.getAdById);
router.get('/ads/search/:searchPhrase', AdController.getAdBySearch);
router.post(
  '/ads',
  authMiddleware,
  imageUpload.single('image'),
  AdController.addAd
);
router.put(
  '/ads/:id',
  authMiddleware,
  imageUpload.single('image'),
  AdController.updateAdById
);
router.delete('/ads/:id', authMiddleware, AdController.removeAdById);

module.exports = router;

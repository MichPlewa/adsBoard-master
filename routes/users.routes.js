const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const userController = require('../controllers/users.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/auth/user', authMiddleware, userController.getLoggedUser);
router.post(
  '/auth/register',
  imageUpload.single('avatar'),
  userController.register
);
router.post('/auth/login', userController.login);
router.delete('/auth/logout', authMiddleware, userController.logout);

module.exports = router;

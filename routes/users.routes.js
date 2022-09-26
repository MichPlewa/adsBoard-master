const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const userController = require('../controllers/users.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/user', authMiddleware, userController.getLoggedUser);
router.post(
  '/register',
  imageUpload.single('avatar'),
  userController.register
);
router.post('/login', userController.login);
router.delete('/logout', authMiddleware, userController.logout);

module.exports = router;

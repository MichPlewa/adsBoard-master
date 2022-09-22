const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

exports.getLoggedUser = async (req, res) => {
  const { login } = req.user;
  try {
    res.json('You logged: ' + login);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    const isLogin = login && typeof login === 'string';
    const isPassword = password && typeof password === 'string';
    const isFile =
      req.file &&
      ['image/png', 'image/jpg', 'image/jpeg', 'image/git'].includes(fileType);

    const isDataValid = isLogin && isPassword && isFile;

    if (isDataValid) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        if (req.file) {
          fs.unlinkSync(`./public/uploads//${req.file.filename}`);
        }
        return res
          .status(409)
          .json({ message: 'User with this login already exists' });
      }

      const user = new User({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
      });
      await user.save();
      res.status(201).json({ message: 'User created ' + user.login });
    } else {
      if (req.file) {
        fs.unlinkSync(`./public/uploads//${req.file.filename}`);
      }
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const isLogin = login && typeof login === 'string';
    const isPassword = password && typeof password === 'string';

    if (isLogin && isPassword) {
      const user = await User.findOne({ login });

      if (!user) {
        res.status(400).json({ message: 'Login or password are incorrect!' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.login = user.login;
          res.status(200).json({ message: 'Login successful ' + login });
        } else {
          res.status(400).json({ message: 'Login or password are incorrect!' });
        }
      }
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

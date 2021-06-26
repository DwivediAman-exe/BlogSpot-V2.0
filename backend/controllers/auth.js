const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

// signUP method
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // checking if the user is unique
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // generating username & profile then saving newUser
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });

    await newUser.save().then(() => {
      res.json({ message: 'Signup Successful ! Please LogIn to continue' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('SignUp Server error');
  }
};

// signIN method
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  //check if user doesnot exists
  await User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: 'Email does not exists. Please SignUp' });
    }

    // if authentication user error
    if (!user.authenticate(password)) {
      return res.status(400).json({ error: 'Email and Password do not match' });
    }

    // else generate a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '3 days',
    });

    // using cookies to store token
    res.cookie('token', token, { expiresIn: '3 days' });

    const { _id, username, name, email, role } = user;

    // sending required details to client
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

// signOUT method
exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Signout success',
  });
};

// Protected routes
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

// user access
exports.authMiddleware = async (req, res, next) => {
  const authUserId = req.user._id;
  await User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};

// admin access
exports.adminMiddleware = async (req, res, next) => {
  const adminUserId = req.user._id;
  await User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    if (user.role !== 1) {
      return res.status(400).json({
        error: 'Admin access denied',
      });
    }
    req.profile = user;
    next();
  });
};

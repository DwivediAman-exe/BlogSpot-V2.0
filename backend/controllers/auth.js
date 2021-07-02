const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Blog = require('../models/blog');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.preSignup = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is already in taken',
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '10m' }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link | ${process.env.APP_NAME}`,
      html: `
      <p>Please use the following link to activate your acccount:</p>
      <p>${process.env.CLIENT_URL}/auth/account/activate/${token}</p>
      <p>This Link will expire in 10 MINUTES</p>
			<hr />
			<p>This email contains sensetive information</p>
			<p>Visit homepage : http://localhost:3000</p>
        `,
    };

    sgMail
      .send(emailData)
      .then((response) => {
        console.log(response[0].statusCode);
        return res.json({
          message: `Email has been sent to ${email} \n Follow the instruction for your asccount Activation.`,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

// signUP method
// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // checking if the user is unique
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: 'Email is already in use' });
//     }

//     // generating username & profile then saving newUser
//     let username = shortId.generate();
//     let profile = `${process.env.CLIENT_URL}/profile/${username}`;

//     let newUser = new User({ name, email, password, profile, username });

//     await newUser.save().then(() => {
//       res.json({ message: 'Signup Successful ! Please LogIn to continue' });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('SignUp Server error');
//   }
// };

// signIN method

exports.signup = (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: 'Expired link. Signup again',
          });
        }

        const { name, email, password } = jwt.decode(token);

        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        const user = new User({ name, email, password, profile, username });
        user.save((err, user) => {
          if (err) {
            return res.status(401).json({
              error: errorHandler(err),
            });
          }
          return res.json({
            message: 'Singup success! Please LogIn',
          });
        });
      }
    );
  } else {
    return res.json({
      message: 'Something went wrong. Try again later',
    });
  }
};

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

exports.canUpdateDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    let authorizedUser =
      data.postedBy._id.toString() === req.profile._id.toString();
    if (!authorizedUser) {
      return res.status(400).json({
        error: 'You are not authorized',
      });
    }
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'User with that email does not exist',
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m',
    });

    // email

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset Link | ${process.env.APP_NAME}`,
      html: `
			<div>
			<p>Please use the following link to reset your password: </p>
			<p>URL: ${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
			<p>This Link will expire in 10 MINUTES</p>
			<hr />
			<p>This email contains sensetive information</p>
			<p>Visit homepage : http://localhost:3000</p></div>
			`,
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      } else {
        sgMail
          .send(emailData)
          .then((response) => {
            console.log(response[0].statusCode);
            return res.json({
              message: `Email has been sent to ${email} \n Follow the instruction to reset your password.`,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: 'Expired link. Try again',
          });
        }
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            console.log(err);
            return res.status(401).json({
              error: 'Something went wrong. Try again later please',
            });
          }
          const updatedFields = {
            password: newPassword,
            resetPasswordLink: '',
          };

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        });
      }
    );
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = (req, res) => {
  const idToken = req.body.tokenId;
  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      // console.log(response)
      const { email_verified, name, email, jti } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            // console.log(user)
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '2d',
            });
            res.cookie('token', token, { expiresIn: '2d' });
            const { _id, email, name, role, username } = user;
            return res.json({
              token,
              user: { _id, email, name, role, username },
            });
          } else {
            let username = shortId.generate();
            let profile = `${process.env.CLIENT_URL}/profile/${username}`;
            let password = jti;
            user = new User({ name, email, profile, username, password });
            user.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  error: errorHandler(err),
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '2d' }
              );
              res.cookie('token', token, { expiresIn: '2d' });
              const { _id, email, name, role, username } = data;
              return res.json({
                token,
                user: { _id, email, name, role, username },
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Google login failed. Try again.',
        });
      }
    });
};

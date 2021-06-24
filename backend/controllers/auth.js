const User = require('../models/user');
const shortId = require('shortid');

// exports.signup = (req, res) => {
//   const { name, email, password } = req.body;

//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({ error: 'Email is already in use' });
//     }

//     let username = shortId.generate();
//     let profile = `${process.env.CLIENT_URL}/profile/${username}`;

//     let newUser = new User({ name, email, password, profile, username });

//     newUser.save((err, success) => {
//       if (err) return res.status(400).json({ error: err });
//       res.json({
//         user: newUser,
//       });
//       // res.json({ message: 'Signup Successful ! Please LogIn' });
//     });
//   });
// };

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

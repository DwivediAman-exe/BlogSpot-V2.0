require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./db');

//creating the app
const app = express();

// connecting databse
db();

// adding the middlewares (morgan, cookieparser, and bodyparser)
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

// using cors
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes
app.get('/api', (req, res) => {
  res.status(200).send('Server is live and running 🔥🔥🔥');
});

// starting the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`\n💻 Server running on http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./db');

// bringing routes
const blogRoutes = require('./routes/blog');

//creating the app
const app = express();

// connecting databse
db();

// adding the middlewares (morgan, cookieparser, and bodyparser)
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

// using cors for development purpose
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/api', blogRoutes);

// starting the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`\n💻 Server running on http://localhost:${port}`);
});

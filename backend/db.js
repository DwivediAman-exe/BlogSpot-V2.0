const mongoose = require('mongoose');

const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('🌩  Database Connected');
  } catch (err) {
    console.log('🌧 Database Connection Error', err);
    process.exit(1);
  }
};

module.exports = db;

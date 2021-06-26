const Category = require('../models/category');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');

// creating a category
exports.create = async (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });

  await category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

// reading all categories
exports.list = async (req, res) => {
  await Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

// reading a category
exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  await Category.findOne({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(category);
  });
};

// remove a category
exports.remove = async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  await Category.findOneAndRemove({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Category deleted Successfully',
    });
  });
};

const Tag = require('../models/tag');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Blog = require('../models/blog');
const tag = require('../models/tag');

// creating a tag
exports.create = async (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });

  await tag.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

// reading all tags
exports.list = async (req, res) => {
  await Tag.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

// reading a tag
exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: 'Tag not found',
      });
    }
    // res.json(tag);
    Blog.find({ tags: tag })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id username')
      .select(
        '_id title slug excerpt categories postedBy tags createdAt updatedAt'
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json({ tag: tag, blogs: data });
      });
  });
};

// remove a tag
exports.remove = async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  await Tag.findOneAndRemove({ slug }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Tag deleted Successfully',
    });
  });
};

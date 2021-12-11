const { Developer } = require('../../model');

const getAll = async (req, res, next) => {
  const result = await Developer.find({});
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result },
  });
};
module.exports = getAll;

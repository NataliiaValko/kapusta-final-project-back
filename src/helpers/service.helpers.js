const isDuplicateKeyError = (error) => error.code === 11000;

module.exports = { isDuplicateKeyError };

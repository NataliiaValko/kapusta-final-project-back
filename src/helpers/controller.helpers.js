const { NotFound, BadRequest } = require('http-errors');

const isErrorOrFalsyValue = (obj) => {
  return obj instanceof Error || obj === null || obj === undefined;
};

const responseWithError = async (obj, next) => {
  if (obj instanceof Error) {
    next(obj);
  }

  if (obj === null) {
    next(new NotFound(`Not found`));
  }
};

module.exports = {
  isErrorOrFalsyValue,
  responseWithError,
};

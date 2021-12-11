const getSchemaEnum = (objArray) => {
  const res = Object.assign({}, {}, ...objArray);
  return Object.values(res);
};

module.exports = { getSchemaEnum };

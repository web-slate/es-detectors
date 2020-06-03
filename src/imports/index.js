const { parse } = require('esprima');

module.exports = function (source) {
  const { body } = parse(source, { sourceType: "module" });
  return body;
}
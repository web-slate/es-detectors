const {
  IMPORT_DECLARATION,
  IDENTIFIER,
  IMPORT_SPECIFIER,
  IMPORT_DEFAULT_SPECIFIER,
} = require('./constants');

module.exports = {
  isImportLine: (type = '') => (type.length > 0 && type === IMPORT_DECLARATION),
  hasArrayItems: (items = []) => (Array.isArray(items) && items.length > 0),
  isDefaultImportSpecifier: (identifierType = '') => (identifierType.length > 0 && identifierType === IMPORT_DEFAULT_SPECIFIER),
  isImportSpecifier: (identifierType = '') => (identifierType.length > 0 && identifierType === IMPORT_SPECIFIER),
  isIdentifier: (type = '') => (type.length > 0 && type === IDENTIFIER),
}
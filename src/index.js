const { parse } = require('esprima');

const {
  isImportLine,
  hasArrayItems,
  isIdentifier,
  isDefaultImportSpecifier,
  isImportSpecifier,
} = require('./Utilities');

// `Detectors` Methods.
const getImports = require('./getImports/index');
const getParsedImports = require('./getParsedImports/index');
const getRawImportInfo = require('./getRawImportInfo/index');

function detectCode (source) {
  const { body: rawImports } = parse(source, { sourceType: "module" });
  const parsedImportList = [];

  rawImports.forEach(importLine => {
    const { type, specifiers, source = {} } = importLine;
    const isSpecifierExist = hasArrayItems(specifiers);

    if (!source.value) {
      return;
    }

    const parsedImport = {
      path: source.value, // Define the Path.
      default: '',
      exported: []
    };

    if (isImportLine(type) && isSpecifierExist) {
      specifiers.forEach(({ type: identifierType, local: localIdentifier }) => {
        const {
          type: localIdentifierType,
          name: localIdentifierName
        } = localIdentifier;

        if (
          isDefaultImportSpecifier(identifierType) &&
          isIdentifier(localIdentifierType)
        ) {
          parsedImport.default = localIdentifierName;
          return;
        }

        if (
          isImportSpecifier(identifierType) &&
          isIdentifier(localIdentifierType)
        ) {
          parsedImport.exported = [...parsedImport.exported, localIdentifierName];
          return;
        }
      });
    }
  
    parsedImportList.push(parsedImport);
  });

  return {
    getImports: () => getImports(parsedImportList),
    getRawImportInfo: () => getRawImportInfo(rawImports),
  }
}

module.exports = detectCode;
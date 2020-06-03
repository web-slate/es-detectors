const {
  isImportLine,
  hasArrayItems,
  isIdentifier,
  isDefaultImportSpecifier,
  isImportSpecifier,
} = require('../../Utilities');

function getImports (rawImports = []) {
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

  return parsedImportList;
}

module.exports = getImports;
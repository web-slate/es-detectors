// Import `Detectors` Methods.
const parseImports = require('./imports/index');
const getImports = require('./imports/getImports/index');
const getLocalImports = require('./imports/getLocalImports/index');
const getRawImportInfo = require('./imports/getRawImportInfo/index');

function detectCode (source) {
  const rawImports = parseImports(source);

  return {
    getImports: () => getImports(rawImports),
    getRawImportInfo: () => getRawImportInfo(rawImports),
    getLocalImports: () => {
      return getLocalImports(
        getImports(rawImports),
      );
    },
  }
}

module.exports = detectCode;
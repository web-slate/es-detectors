const { parse } = require("esprima");

const yourCode = `
  import get from 'lodash/get';
  import PropTypes from 'prop-types';
  import React, { Fragment } from 'react';
  import { addMessage, clearErrorMessage } from './store/actions/messager';
  import Button from '../../../ui-components/Button';
  import {
    createPayload as cPAR,
    todayDate,
  } from '../../../belt-utility';
`;

const { body: parseImports } = parse(yourCode, { sourceType: "module" });

const [
  IMPORT_DECLARATION,

  // Identifier.
  IDENTIFIER,

  // Specifiers.
  IMPORT_SPECIFIER,
  IMPORT_DEFAULT_SPECIFIER
] = [
  "ImportDeclaration",

  "Identifier",

  "ImportSpecifier",
  "ImportDefaultSpecifier"
];

parseImports.forEach(importLine => {
  const { type, specifiers, source } = importLine;
  const isImportLine = type === IMPORT_DECLARATION;
  const isSpecifierExist = Array.isArray(specifiers) && specifiers.length > 0;

  if (isImportLine && isSpecifierExist) {
    specifiers.forEach(({ type: identifierType, local: localIdentifier }) => {
      const isDefaultSpecifier = identifierType === IMPORT_DEFAULT_SPECIFIER;
      const isImportSpecifier = identifierType === IMPORT_SPECIFIER;

      if (isDefaultSpecifier || isImportSpecifier) {
        const {
          type: localIdentifierType,
          name: localIdentifierName
        } = localIdentifier;
        const isIdentifier = localIdentifierType === IDENTIFIER;

        if (isIdentifier) {
          // @tdd: Add Your Mock question here.
          console.log('localIdentifierName: ', localIdentifierName);
        }
      }
      // if (type === 'Identifier') {
      //   console.log('name: ', identifier.type, identifier.local);
      // }
    });
  }

  console.log('specifiers: ', specifiers);
  console.log('source: ', source);
});

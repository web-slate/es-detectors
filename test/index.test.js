const detector = require('../src/index');

describe('es-detector', () => {
  let myEsCode = '';
  beforeEach(() => {
    myEsCode = `
      import get from 'lodash/get';
      import PropTypes from 'prop-types';
      import React, { Fragment } from 'react';
      import { addMessage, clearErrorMessage } from './store/actions/message';
      import Button from '../../../ui-components/Button';
      import {
        createPayload as cPAR,
        todayDate,
      } from '../../../belt-utility';
    `;
  });

  test('should parse the data', () => {
    expect(detector(myEsCode)).not.toBeNull();
  });

  test('should match the import', () => {
    const yourCode = `
      import React from 'react';
      import { AgGridReact } from 'ag-grid-react';
      import { AllModules } from '@ag-grid-community/all-modules';

      // Ag Grid CSS Files.
      import 'ag-grid-community/dist/styles/ag-grid.css';
      import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

      const Table = () => {}
    `;

    const {
      getImports,
    } = detector(yourCode);
    expect(getImports()).toEqual([
      {
        "path": "react",
        "default": "React",
        "exported": []
      },
      {
        "path": "ag-grid-react",
        "default": "",
        "exported": [
          "AgGridReact"
        ]
      },
      {
        "path": "@ag-grid-community/all-modules",
        "default": "",
        "exported": [
          "AllModules"
        ]
      },
      {
        "path": "ag-grid-community/dist/styles/ag-grid.css",
        "default": "",
        "exported": []
      },
      {
        "path": "ag-grid-community/dist/styles/ag-theme-alpine.css",
        "default": "",
        "exported": []
      }
    ]);
  });
})
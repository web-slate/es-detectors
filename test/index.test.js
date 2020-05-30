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
})
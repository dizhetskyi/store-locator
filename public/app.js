import './scss/index.scss';

import React from 'react';
import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';

import StoreLocator from './scripts/StoreLocator';

render(<StoreLocator data={'/public/data.json'} />, document.getElementById('storeLocator'));
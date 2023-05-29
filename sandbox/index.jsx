import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';

const rootElement = document.getElementById('app');

render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement,
);

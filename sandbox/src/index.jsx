import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';
import story from './story.json';

const rootElement = document.getElementById('app');

render(
    <StrictMode>
        <App document={story}/>
    </StrictMode>,
    rootElement,
);

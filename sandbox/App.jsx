import React from 'react';

import { Renderer } from '@prezly/content-renderer-react-js';

import '@prezly/content-renderer-react-js/styles.css'
import './styles.css';

import story from './story.json';

export const App = () => (
    <div className="App">
        <Renderer nodes={story} />
    </div>
)

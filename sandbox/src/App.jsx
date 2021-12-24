import React from 'react';

import { Renderer } from '#content-renderer-react-js';

export const App = ({ document }) => (
    <div className="App">
        <Renderer nodes={document} />
    </div>
)

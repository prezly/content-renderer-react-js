import React from 'react';

import { Renderer, RendererContextProvider } from '@prezly/content-renderer-react-js';
import { STORY_BOOKMARK_NODE_TYPE } from '@prezly/slate-types';

import '@prezly/content-renderer-react-js/styles.css';
import './styles.css';

import story from './story.json';
import referencedStory from './referencedStory.json';

export const App = () => (
    <div className="App">
        <RendererContextProvider
            elements={{
                [STORY_BOOKMARK_NODE_TYPE]: {
                    getStory: () => storySample,
                },
            }}
        >
            <Renderer nodes={story} />
        </RendererContextProvider>
    </div>
);

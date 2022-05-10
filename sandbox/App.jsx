import React from 'react';
import { Component, Elements, Renderer } from '@prezly/content-renderer-react-js';
import { isStoryBookmarkNode } from '@prezly/story-content-format';

import '@prezly/content-renderer-react-js/styles.css';

import './styles.css';
import story from './story.json';
import referencedStory from './referencedStory.json';

export const App = () => (
    <div className="App">
        <Renderer nodes={story.children} defaultFallback="warning">
            <Component match={isStoryBookmarkNode} component={PrefetchedStoryBookmark} />
        </Renderer>
    </div>
);

function PrefetchedStoryBookmark({ node }) {
    return <Elements.StoryBookmark node={node} story={referencedStory} />;
}

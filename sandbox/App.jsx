import { Component, Elements, Renderer } from '@prezly/content-renderer-react-js';
import { StoryBookmarkNode } from '@prezly/story-content-format';

import '@prezly/content-renderer-react-js/styles.css';

import './styles.css';
import referencedCoverage from './referencedCoverage.json';
import referencedStory from './referencedStory.json';
import story from './story.json';

const coverageEntries = {
    123456: referencedCoverage,
};

export const App = () => (
    <div className="App">
        <Renderer
            coverageEntries={coverageEntries}
            nodes={story.children}
            defaultFallback="warning"
        >
            <Component
                match={StoryBookmarkNode.isStoryBookmarkNode}
                component={PrefetchedStoryBookmark}
            />
        </Renderer>
    </div>
);

function PrefetchedStoryBookmark({ node }) {
    return <Elements.StoryBookmark node={node} storyOEmbedInfo={referencedStory.oembed} />;
}

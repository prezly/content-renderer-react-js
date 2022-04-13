import type { Story } from '@prezly/sdk';

export interface StoryBookmarkContext {
    getStory: (uuid: string) => Story;
}

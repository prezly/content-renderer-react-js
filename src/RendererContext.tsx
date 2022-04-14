import type { PropsWithChildren } from 'react';
import React, { createContext, useContext } from 'react';
import type { STORY_BOOKMARK_NODE_TYPE } from '@prezly/slate-types';
import type { StoryBookmarkContext } from './elements/StoryBookmark';

interface ElementsContexts {
    [STORY_BOOKMARK_NODE_TYPE]?: StoryBookmarkContext;
}

export interface RendererContextProps {
    elementsContext?: ElementsContexts;
}

const RendererContext = createContext<RendererContextProps>({});

export function RendererContextProvider({
    elementsContext,
    children,
}: PropsWithChildren<RendererContextProps>) {
    return (
        <RendererContext.Provider value={{ elementsContext }}>{children}</RendererContext.Provider>
    );
}

export function useRendererContext() {
    return useContext(RendererContext);
}

export function useElementContext<T extends keyof ElementsContexts>(type: T) {
    const ctx = useRendererContext();
    return ctx.elementsContext?.[type];
}

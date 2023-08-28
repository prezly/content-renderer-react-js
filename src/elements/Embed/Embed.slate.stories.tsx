import { EmbedNode } from '@prezly/story-content-format';
import type { Meta, Story, StoryFn } from '@storybook/react';

import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Embed',
    decorators: [StoryNameDecorator],
    argTypes: {
        layout: {
            control: { type: 'radio' },
            options: [
                EmbedNode.Layout.CONTAINED,
                EmbedNode.Layout.EXPANDED,
                EmbedNode.Layout.FULL_WIDTH,
            ],
            defaultValue: EmbedNode.Layout.CONTAINED as `${EmbedNode.Layout}`,
            description: 'The specified layout',
        },
    },
} as Meta;

export const VideoEmbedIframe: StoryFn<{ layout: `${EmbedNode.Layout}` }> = ({ layout }) => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: `Video iframe embed (${layout} layout):`,
                    },
                ],
            },
            {
                type: 'embed',
                uuid: 'ef4169f6-1189-406c-825a-45c282e71b90',
                url: 'https://www.youtube.com/watch?v=A5uqY2x25GE',
                layout,
                oembed: {
                    author_url: 'https://www.youtube.com/channel/UCJ4E393uI8mWRlSqgoeUKKw',
                    cache_age: 86400,
                    description:
                        "Building stuff since i was young. Had 1 'real' job where I was hired as an assistant, built their website, their intranet, their parent company...Started web firm, grew it to about 10 people. Started startup which never really took off (trackmypeople.com). Moved on to a large agency where we grew from 5 to 80 people. In charge of sales. Moved to Prezly about 3 years ago, never looked back\n\nTo see how much revenue this company is doing visit: http://getlatka.com now\n\nFor more content go to http://nathanlatka.com\n\nAdd Nathan on snapchat: nlatka\nLike Nathan on Facebook for behind the scenes videos: http://nathanlatka.com/facebook\nFollow Nathan on Instagram for rare photos and contests: http://nathanlatka.com/instagram",
                    html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DA5uqY2x25GE&amp;key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media *; accelerometer; gyroscope; picture-in-picture"></iframe></div></div>',
                    provider_name: 'YouTube',
                    screenshot_url:
                        'https://avatars-cdn.prezly.com/embed/aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g.dj1BNXVxWTJ4MjVHRQ__/3d02b090ce4d8695299760f56c4ae5a11bb64120ca178d8ab848a4327676a18b?v=1583930760',
                    thumbnail_height: 720,
                    thumbnail_url: 'https://i.ytimg.com/vi/A5uqY2x25GE/maxresdefault.jpg',
                    thumbnail_width: 1280,
                    title: 'How Prezly Bootstrapped To $1.6m+ in ARR (Ep1038 Gijs Nelissen, Prezly)',
                    type: 'video',
                    url: 'https://www.youtube.com/watch?v=A5uqY2x25GE',
                    version: '1.0',
                },
            },
        ]}
    />
);

VideoEmbedIframe.story = {
    parameters: {
        loki: { skip: true },
    },
    args: {
        layout: EmbedNode.Layout.CONTAINED,
    },
};

export const TwitterPostIframe: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Twitter post embed (iframe):',
                    },
                ],
            },
            {
                type: 'embed',
                uuid: '90bd57f9-523e-44df-ba65-a11674c45404',
                url: 'https://twitter.com/Prezly/status/1255868048222945281',
                layout: 'contained',
                oembed: {
                    author_url: 'https://twitter.com/Prezly',
                    cache_age: 86400,
                    description:
                        'The results of the Global PR Survey 2020 are now live! Read them in full at https://t.co/Zz61D3S7TqHuge thank you to everyone that took part ❤️— Prezly (@Prezly) April 30, 2020\n\n',
                    html: '<div class="iframely-embed" style="max-width: 550px;"><div class="iframely-responsive" style="padding-bottom: 100%;"><a href="https://twitter.com/Prezly/status/1255868048222945281" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Ftwitter.com%2FPrezly%2Fstatus%2F1255868048222945281&amp;key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    provider_name: 'Twitter',
                    screenshot_url:
                        'https://avatars-cdn.prezly.com/embed/aHR0cHM6Ly90d2l0dGVyLmNvbS9QcmV6bHkvc3RhdHVzLzEyNTU4NjgwNDgyMjI5NDUyODE_/7d7cf7768b2cf588c3e160f8a859da185315329a4d23e16a1e64ac29a4314e87?v=1583930760',
                    title: 'Prezly on Twitter',
                    type: 'rich',
                    url: 'https://twitter.com/Prezly/status/1255868048222945281',
                    version: '1.0',
                },
            },
        ]}
    />
);

TwitterPostIframe.story = {
    parameters: {
        loki: { skip: true },
    },
};

export const RichWebsiteCardIframe: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Rich website card (iframe):',
                    },
                ],
            },
            {
                type: 'embed',
                uuid: '5024d558-75ef-4d56-a114-87674b522c1e',
                url: 'https://prezly.com',
                layout: 'contained',
                oembed: {
                    cache_age: 86400,
                    description:
                        'Prezly provides software for communications teams that want to do more. Manage your media relations, create online newsrooms, and publish and pitch your stories from one place.',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50.0611%; padding-top: 120px;"><a href="https://www.prezly.com" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fprezly.com&amp;key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    provider_name: 'Prezly.com',
                    screenshot_url:
                        'https://avatars-cdn.prezly.com/embed/aHR0cHM6Ly9wcmV6bHkuY29t/94cb1ec9458caf01031ad06ed8cbeb3fc27202f9ee79ea92e7be46f7466880d5?v=1583930760',
                    thumbnail_height: 410,
                    thumbnail_url: 'https://www.prezly.com/build/images/static/default-social.jpg',
                    thumbnail_width: 819,
                    title: 'PR Software for better, faster PR',
                    type: 'rich',
                    url: 'https://www.prezly.com',
                    version: '1.0',
                },
            },
        ]}
    />
);

RichWebsiteCardIframe.story = {
    parameters: {
        loki: { skip: true },
    },
};

export const Minimal: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Minimal details embed (link only):',
                    },
                ],
            },
            {
                type: 'embed',
                uuid: 'da744513-8fe7-4e22-9e85-6f5e122b93a1',
                url: 'https://www.prezly.com/',
                layout: 'contained',
                oembed: {
                    type: 'link',
                    cache_age: 86400,
                    html: '<a class="embed embed--link" href="http://example.com" target="_blank" rel="noopener noreferrer">Example Domain</a>',
                    title: 'Prezly: PR Software for better, faster PR',
                    url: 'https://www.prezly.com/',
                    version: '1.0',
                },
            },
        ]}
    />
);

Minimal.story = {
    parameters: {
        loki: { skip: true },
    },
};

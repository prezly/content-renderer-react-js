import type { Meta, Story } from '@storybook/react';

import { ContainerDecorator } from '../../dev/ContainerDecorator';
import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Video',
    decorators: [ContainerDecorator, StoryNameDecorator],
} as Meta;

export const WithLayoutContained: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Regular video block:',
                    },
                ],
            },
            {
                type: 'video',
                layout: 'contained',
                uuid: 'eb427552-4110-487a-b1ed-228c5173ea37',
                url: 'https://www.youtube.com/watch?v=OYMLjqoYhdw',
                oembed: {
                    url: 'https://www.youtube.com/watch?v=OYMLjqoYhdw',
                    html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOYMLjqoYhdw&key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>',
                    type: 'video',
                    title: 'Guardians of the Galaxy Awesome Mix Vol 1 Vol 2',
                    version: '1.0',
                    cache_age: 86400,
                    author_url: 'https://www.youtube.com/channel/UCF9XGmwnpitwBIUlQkQZOgA',
                    description:
                        'Diese Aufzeichnung dient lediglich zu Schulungszwecken und  Bereicherung an alle, die diese Folge verpasst haben oder sie aus dem Ausland nicht verfolgen konnten !\nBei Problemen bitte unter Alternative Videos melden!',
                    provider_name: 'YouTube',
                    thumbnail_url: 'https://i.ytimg.com/vi/OYMLjqoYhdw/sddefault.jpg',
                    thumbnail_width: 640,
                    thumbnail_height: 480,
                },
            },
        ]}
    />
);

WithLayoutContained.story = {
    parameters: { loki: { skip: true } },
};

export const WithLayoutExpanded: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Expanded video block:',
                    },
                ],
            },
            {
                type: 'video',
                layout: 'expanded',
                uuid: 'eb427552-4110-487a-b1ed-228c5173ea37',
                url: 'https://www.youtube.com/watch?v=OYMLjqoYhdw',
                oembed: {
                    url: 'https://www.youtube.com/watch?v=OYMLjqoYhdw',
                    html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOYMLjqoYhdw&key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>',
                    type: 'video',
                    title: 'Guardians of the Galaxy Awesome Mix Vol 1 Vol 2',
                    version: '1.0',
                    cache_age: 86400,
                    author_url: 'https://www.youtube.com/channel/UCF9XGmwnpitwBIUlQkQZOgA',
                    description:
                        'Diese Aufzeichnung dient lediglich zu Schulungszwecken und  Bereicherung an alle, die diese Folge verpasst haben oder sie aus dem Ausland nicht verfolgen konnten !\nBei Problemen bitte unter Alternative Videos melden!',
                    provider_name: 'YouTube',
                    thumbnail_url: 'https://i.ytimg.com/vi/OYMLjqoYhdw/sddefault.jpg',
                    thumbnail_width: 640,
                    thumbnail_height: 480,
                },
            },
        ]}
    />
);

WithLayoutExpanded.story = {
    parameters: { loki: { skip: true } },
};

export const WithLayoutFullWidth: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Full width video block:',
                    },
                ],
            },
            {
                type: 'video',
                layout: 'full-width',
                uuid: 'eb427552-4110-487a-b1ed-228c5173ea37',
                url: 'https://www.youtube.com/watch?v=OYMLjqoYhdw',
                oembed: {
                    url: 'https://www.youtube.com/watch?v=OYMLjqoYhdw',
                    html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOYMLjqoYhdw&key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>',
                    type: 'video',
                    title: 'Guardians of the Galaxy Awesome Mix Vol 1 Vol 2',
                    version: '1.0',
                    cache_age: 86400,
                    author_url: 'https://www.youtube.com/channel/UCF9XGmwnpitwBIUlQkQZOgA',
                    description:
                        'Diese Aufzeichnung dient lediglich zu Schulungszwecken und  Bereicherung an alle, die diese Folge verpasst haben oder sie aus dem Ausland nicht verfolgen konnten !\nBei Problemen bitte unter Alternative Videos melden!',
                    provider_name: 'YouTube',
                    thumbnail_url: 'https://i.ytimg.com/vi/OYMLjqoYhdw/sddefault.jpg',
                    thumbnail_width: 640,
                    thumbnail_height: 480,
                },
            },
        ]}
    />
);

WithLayoutFullWidth.story = {
    parameters: { loki: { skip: true } },
};

export const AspectRatio: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Video with non-standard aspect ratio:',
                    },
                ],
            },
            {
                type: 'video',
                layout: 'contained',
                uuid: 'a2c539d4-b9a0-4ecb-acf9-0e6167b30e0e',
                url: 'https://youtu.be/PU5xxh5UX4U?list=RDMMPU5xxh5UX4U',
                oembed: {
                    url: 'https://www.youtube.com/watch?v=PU5xxh5UX4U',
                    html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 75%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fyoutu.be%2FPU5xxh5UX4U%3Flist%3DRDMMPU5xxh5UX4U&key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>',
                    type: 'video',
                    title: 'Elvis Presley - Return To Sender [Video]',
                    version: '1.0',
                    cache_age: 86400,
                    author_url: 'https://www.youtube.com/channel/UC7dL8Suw0BKad30H2kddLnQ',
                    description: 'My favorite Elvis song.',
                    provider_name: 'YouTube',
                    thumbnail_url: 'https://i.ytimg.com/vi/PU5xxh5UX4U/hqdefault.jpg',
                    thumbnail_width: 480,
                    thumbnail_height: 360,
                },
            },
        ]}
    />
);

AspectRatio.story = {
    parameters: { loki: { skip: true } },
};

export const VerticalVideo: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'A vertical video should be centered:',
                    },
                ],
            },
            {
                type: 'video',
                children: [{ text: '' }],
                uuid: '65b87d4c-6c31-437d-9ea0-0c49ce46bf97',
                url: 'https://cdn.uc.assets.prezly.com/fd30e0f2-9aea-4cb0-b3ec-0381233f27c3/4040354-sd_360_640_30fps.mp4',
                oembed: {
                    cache_age: 86400,
                    content_length: 2092024,
                    html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fcdn.uc.assets.prezly.com%2Ffd30e0f2-9aea-4cb0-b3ec-0381233f27c3%2F4040354-sd_360_640_30fps.mp4&key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen allow="encrypted-media *;"></iframe></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    screenshot_url:
                        'https://avatars-cdn.prezly.com/embed/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6ImtleTpzY3IifQ.eyJ0IjoxNzE5MzAyNjkxLCJ1cmwiOiJodHRwczovL2Nkbi51Yy5hc3NldHMucHJlemx5LmNvbS9mZDMwZTBmMi05YWVhLTRjYjAtYjNlYy0wMzgxMjMzZjI3YzMvNDA0MDM1NC1zZF8zNjBfNjQwXzMwZnBzLm1wNCIsInYiOiIxNTgzOTMwNzYwIn0.tLKNL-g4cO5KU4VHpEIM1cbUn9V6DdOI-9rwV_jEWmo',
                    title: 'cdn.uc.assets.prezly.com/fd30e0f2-9aea-4cb0-b3ec-0381233f27c3/4040354-sd_360_640_30fps.mp4',
                    type: 'video',
                    url: 'https://cdn.uc.assets.prezly.com/fd30e0f2-9aea-4cb0-b3ec-0381233f27c3/4040354-sd_360_640_30fps.mp4',
                    version: '1.0',
                    thumbnail_url:
                        'https://cdn.uc.assets.prezly.com/6ba4c34e-b44a-4b61-9c38-266c7bb84f0f/',
                    thumbnail_height: 640,
                    thumbnail_width: 360,
                },
                layout: 'contained',
            },
        ]}
    />
);

VerticalVideo.story = {
    parameters: { loki: { skip: true } },
};

export const WithoutIframeEmbedCode: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Video without iframe embed code:',
                    },
                ],
            },
            {
                type: 'video',
                layout: 'contained',
                uuid: '379f74f1-44cd-4d6b-8716-181dc5654a14',
                url: 'https://youtu.be/PU5xxh5UX4U?list=RDMMPU5xxh5UX4U',
                oembed: {
                    url: 'https://www.youtube.com/watch?v=PU5xxh5UX4U',
                    type: 'video',
                    title: 'Elvis Presley - Return To Sender [Video]',
                    version: '1.0',
                    cache_age: 86400,
                    author_url: 'https://www.youtube.com/channel/UC7dL8Suw0BKad30H2kddLnQ',
                    description: 'My favorite Elvis song.',
                    provider_name: 'YouTube',
                    thumbnail_url: 'https://i.ytimg.com/vi/PU5xxh5UX4U/hqdefault.jpg',
                    thumbnail_width: 480,
                    thumbnail_height: 360,
                },
            },
        ]}
    />
);

WithoutIframeEmbedCode.story = {
    parameters: { loki: { skip: true } },
};

export const WithoutThumbnailAndIframeEmbedCode: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Video without thumbnail and without iframe embed code:',
                    },
                ],
            },
            {
                type: 'video',
                layout: 'contained',
                uuid: 'abcb7f08-d323-495f-ae4b-9a9b927b3ac1',
                url: 'https://youtu.be/PU5xxh5UX4U?list=RDMMPU5xxh5UX4U',
                oembed: {
                    url: 'https://www.youtube.com/watch?v=PU5xxh5UX4U',
                    type: 'video',
                    title: 'Elvis Presley - Return To Sender [Video]',
                    // author: 'Reigh Phillip Clayton channel',
                    version: '1.0',
                    cache_age: 86400,
                    author_url: 'https://www.youtube.com/channel/UC7dL8Suw0BKad30H2kddLnQ',
                    description: 'My favorite Elvis song.',
                    provider_name: 'YouTube',
                },
            },
        ]}
    />
);

WithoutThumbnailAndIframeEmbedCode.story = {
    parameters: { loki: { skip: true } },
};

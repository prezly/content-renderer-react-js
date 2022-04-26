import React from 'react';
import type { Meta, Story } from '@storybook/react';
import isLokiRunning from '@loki/is-loki-running';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Video',
} as Meta;

export const Regular: Story = () =>
    isLokiRunning() ? (
        <></>
    ) : (
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
                    children: [
                        {
                            text: '',
                        },
                    ],
                    uuid: 'eb427552-4110-487a-b1ed-228c5173ea37',
                    url: 'https://www.youtube.com/watch?v=OYMLjqoYhdw',
                    oembed: {
                        url: 'https://www.youtube.com/watch?v=OYMLjqoYhdw',
                        html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOYMLjqoYhdw&key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>',
                        type: 'video',
                        title: 'Guardians of the Galaxy Awesome Mix Vol 1 Vol 2',
                        author: 'Alternitive Videos',
                        options: {
                            _end: {
                                label: 'End on',
                                value: '',
                                placeholder: 'ex.: 11, 1m10s',
                            },
                            _start: {
                                label: 'Start from',
                                value: '',
                                placeholder: 'ex.: 11, 1m10s',
                            },
                            click_to_play: {
                                label: 'Hold load & play until clicked',
                                value: false,
                            },
                            _cc_load_policy: {
                                label: 'Closed captions',
                                value: false,
                            },
                        },
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

Regular.story = {
    parameters: {
        loki: { skip: true },
    },
};

export const AspectRatio: Story = () =>
    isLokiRunning() ? (
        <></>
    ) : (
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
                    children: [
                        {
                            text: '',
                        },
                    ],
                    uuid: 'a2c539d4-b9a0-4ecb-acf9-0e6167b30e0e',
                    url: 'https://youtu.be/PU5xxh5UX4U?list=RDMMPU5xxh5UX4U',
                    oembed: {
                        url: 'https://www.youtube.com/watch?v=PU5xxh5UX4U',
                        html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 75%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fyoutu.be%2FPU5xxh5UX4U%3Flist%3DRDMMPU5xxh5UX4U&key=8fe6cdec03482ac31f27a6ae8ea2fb3f" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>',
                        type: 'video',
                        title: 'Elvis Presley - Return To Sender [Video]',
                        author: 'Reigh Phillip Clayton channel',
                        options: {
                            _end: {
                                label: 'End on',
                                value: '',
                                placeholder: 'ex.: 11, 1m10s',
                            },
                            _start: {
                                label: 'Start from',
                                value: '',
                                placeholder: 'ex.: 11, 1m10s',
                            },
                            click_to_play: {
                                label: 'Hold load & play until clicked',
                                value: false,
                            },
                            _cc_load_policy: {
                                label: 'Closed captions',
                                value: false,
                            },
                        },
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
    parameters: {
        loki: { skip: true },
    },
};

export const WithoutIframeEmbedCode: Story = () =>
    isLokiRunning() ? (
        <></>
    ) : (
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
                    children: [
                        {
                            text: '',
                        },
                    ],
                    uuid: '379f74f1-44cd-4d6b-8716-181dc5654a14',
                    url: 'https://youtu.be/PU5xxh5UX4U?list=RDMMPU5xxh5UX4U',
                    oembed: {
                        url: 'https://www.youtube.com/watch?v=PU5xxh5UX4U',
                        type: 'video',
                        title: 'Elvis Presley - Return To Sender [Video]',
                        author: 'Reigh Phillip Clayton channel',
                        options: {
                            _end: {
                                label: 'End on',
                                value: '',
                                placeholder: 'ex.: 11, 1m10s',
                            },
                            _start: {
                                label: 'Start from',
                                value: '',
                                placeholder: 'ex.: 11, 1m10s',
                            },
                            click_to_play: {
                                label: 'Hold load & play until clicked',
                                value: false,
                            },
                            _cc_load_policy: {
                                label: 'Closed captions',
                                value: false,
                            },
                        },
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
    parameters: {
        loki: { skip: true },
    },
};

export const WithoutThumbnailAndIframeEmbedCode: Story = () =>
    isLokiRunning() ? (
        <></>
    ) : (
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
                    children: [
                        {
                            text: '',
                        },
                    ],
                    uuid: 'abcb7f08-d323-495f-ae4b-9a9b927b3ac1',
                    url: 'https://youtu.be/PU5xxh5UX4U?list=RDMMPU5xxh5UX4U',
                    oembed: {
                        url: 'https://www.youtube.com/watch?v=PU5xxh5UX4U',
                        type: 'video',
                        title: 'Elvis Presley - Return To Sender [Video]',
                        author: 'Reigh Phillip Clayton channel',
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
    parameters: {
        loki: { skip: true },
    },
};

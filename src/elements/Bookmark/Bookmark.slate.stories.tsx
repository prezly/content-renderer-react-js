import createAsyncCallback from '@loki/create-async-callback';
import type { Meta, Story } from '@storybook/react';

import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Bookmark',
    decorators: [
        StoryNameDecorator,
        (Story) => {
            const cb = createAsyncCallback();

            setTimeout(() => {
                cb();
            }, 1000);

            return <Story />;
        },
    ],
} as Meta;

export const BigVertical: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Big vertical web bookmark card:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                oembed: {
                    url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 66.6667%; padding-top: 120px;"><a href="https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.washingtonpost.com%2Ftravel%2Ftips%2Ffrance-travel-us-covid-restrictions%2F&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'Everything you need to know about traveling to France',
                    author: 'Natalie B. Compton',
                    options: {
                        card: {
                            value: '',
                            values: {
                                small: 'Make it a small card',
                            },
                        },
                    },
                    version: '1.0',
                    cache_age: 86400,
                    description:
                        "Here's some essential advice for visiting France, including how to navigate the country's vaccination requirements. Here's some essential advice for visiting France, including how to navigate the country's vaccination requirements.",
                    provider_name: 'Washington Post',
                    thumbnail_url:
                        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RJAEBZMIKJHPFHDOXCPNIF4VJI.jpg&w=1440',
                    thumbnail_width: 1440,
                    thumbnail_height: 960,
                },
                show_thumbnail: true,
                layout: 'vertical',
                new_tab: false,
            },
        ]}
    />
);

export const SmallHorizontal: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Smaller horizontal web bookmark card:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                oembed: {
                    url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 66.6667%; padding-top: 120px;"><a href="https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.washingtonpost.com%2Ftravel%2Ftips%2Ffrance-travel-us-covid-restrictions%2F&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'Everything you need to know about traveling to France',
                    author: 'Natalie B. Compton',
                    options: {
                        card: {
                            value: '',
                            values: {
                                small: 'Make it a small card',
                            },
                        },
                    },
                    version: '1.0',
                    cache_age: 86400,
                    description:
                        "Here's some essential advice for visiting France, including how to navigate the country's vaccination requirements. Here's some essential advice for visiting France, including how to navigate the country's vaccination requirements.",
                    provider_name: 'Washington Post',
                    thumbnail_url:
                        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RJAEBZMIKJHPFHDOXCPNIF4VJI.jpg&w=1440',
                    thumbnail_width: 1440,
                    thumbnail_height: 960,
                },
                show_thumbnail: true,
                layout: 'horizontal',
                new_tab: false,
            },
        ]}
    />
);

export const SmallHorizontalWithLongTexts: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal web bookmark card with long texts',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                oembed: {
                    url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 66.6667%; padding-top: 120px;"><a href="https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.washingtonpost.com%2Ftravel%2Ftips%2Ffrance-travel-us-covid-restrictions%2F&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'Everything you need to know about traveling to France. Everything you need to know about traveling to France. Everything you need to know about traveling to France',
                    author: 'Natalie B. Compton',
                    options: {
                        card: {
                            value: '',
                            values: {
                                small: 'Make it a small card',
                            },
                        },
                    },
                    version: '1.0',
                    cache_age: 86400,
                    description:
                        "Here's some essential advice for visiting France, including how to navigate the country's vaccination requirements. Here's some essential advice for visiting France, including how to navigate the country's vaccination requirements.",
                    provider_name:
                        'https://www.washingtonpost.com/https://www.washingtonpost.com/https://www.washingtonpost.com/',
                    thumbnail_url:
                        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RJAEBZMIKJHPFHDOXCPNIF4VJI.jpg&w=1440',
                    thumbnail_width: 1440,
                    thumbnail_height: 960,
                },
                show_thumbnail: true,
                layout: 'horizontal',
                new_tab: false,
            },
        ]}
    />
);

export const HorizontalWithoutThumbnail: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal web bookmark card without thumbnail:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                oembed: {
                    url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 66.6667%; padding-top: 120px;"><a href="https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.washingtonpost.com%2Ftravel%2Ftips%2Ffrance-travel-us-covid-restrictions%2F&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'Everything you need to know about traveling to France',
                    author: 'Natalie B. Compton',
                    options: {
                        card: {
                            value: '',
                            values: {
                                small: 'Make it a small card',
                            },
                        },
                    },
                    version: '1.0',
                    cache_age: 86400,
                    description:
                        "Here's some essential advice for visiting France, including how to navigate the country's vaccination requirements. Here's some essential advice for visiting France, including how to navigate the country's vaccination requirements.",
                    provider_name: 'Washington Post',
                    thumbnail_url:
                        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RJAEBZMIKJHPFHDOXCPNIF4VJI.jpg&w=1440',
                    thumbnail_width: 1440,
                    thumbnail_height: 960,
                },
                show_thumbnail: false,
                layout: 'horizontal',
                new_tab: false,
            },
        ]}
    />
);

export const HorizontalWithoutDescriptionNewTab: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal web bookmark card without description, opening in a new tab:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                oembed: {
                    url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 66.6667%; padding-top: 120px;"><a href="https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.washingtonpost.com%2Ftravel%2Ftips%2Ffrance-travel-us-covid-restrictions%2F&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'Everything you need to know about traveling to France',
                    author: 'Natalie B. Compton',
                    options: {
                        card: {
                            value: '',
                            values: {
                                small: 'Make it a small card',
                            },
                        },
                    },
                    version: '1.0',
                    cache_age: 86400,
                    provider_name: 'Washington Post',
                    thumbnail_url:
                        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RJAEBZMIKJHPFHDOXCPNIF4VJI.jpg&w=1440',
                    thumbnail_width: 1440,
                    thumbnail_height: 960,
                },
                show_thumbnail: true,
                layout: 'horizontal',
                new_tab: true,
            },
        ]}
    />
);

export const VerticalNewTab: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Vertical web bookmark card opening in a new tab:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.economist.com',
                oembed: {
                    url: 'https://www.economist.com',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.economist.com" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.economist.com&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'The Economist - World News, Politics, Economics, Business & Finance',
                    version: '1.0',
                    cache_age: 86400,
                    description:
                        "Authoritative global news and analysis. The Economist offers fair-minded, fact-checked coverage of world politics, economics, business, science, culture and more. Here's some essential advice for visiting France, including how to navigate the country's vaccination requirements.",
                    provider_name: 'The Economist',
                    thumbnail_url:
                        'https://www.economist.com/engassets/google-search-logo.f1ea908894.png',
                    thumbnail_width: 384,
                    thumbnail_height: 384,
                },
                show_thumbnail: true,
                layout: 'vertical',
                new_tab: true,
            },
        ]}
    />
);

export const Minimal: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Minimal bookmark with no details apart from the URL:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.economist.com',
                oembed: {
                    url: 'https://www.economist.com',
                    type: 'rich',
                    version: '1.0',
                    cache_age: 86400,
                    thumbnail_url:
                        'https://www.economist.com/engassets/google-search-logo.f1ea908894.png',
                    thumbnail_width: 384,
                    thumbnail_height: 384,
                },
                show_thumbnail: false,
                layout: 'horizontal',
                new_tab: true,
            },
        ]}
    />
);

export const VerticalLongTitleShortDescription: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Vertical Long Title and Short Description:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                oembed: {
                    url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 66.6667%; padding-top: 120px;"><a href="https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.washingtonpost.com%2Ftravel%2Ftips%2Ffrance-travel-us-covid-restrictions%2F&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France',
                    author: 'Natalie B. Compton',
                    options: {
                        card: {
                            value: '',
                            values: {
                                small: 'Make it a small card',
                            },
                        },
                    },
                    version: '1.0',
                    cache_age: 86400,
                    description: 'Short description',
                    provider_name: 'Washington Post',
                    thumbnail_url:
                        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RJAEBZMIKJHPFHDOXCPNIF4VJI.jpg&w=1440',
                    thumbnail_width: 1440,
                    thumbnail_height: 960,
                },
                show_thumbnail: true,
                layout: 'vertical',
                new_tab: false,
            },
        ]}
    />
);

export const VerticalShortTitleLongDescription: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Vertical Short Title and Long Description:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                oembed: {
                    url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 66.6667%; padding-top: 120px;"><a href="https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.washingtonpost.com%2Ftravel%2Ftips%2Ffrance-travel-us-covid-restrictions%2F&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'Everything you need',
                    author: 'Natalie B. Compton',
                    options: {
                        card: {
                            value: '',
                            values: {
                                small: 'Make it a small card',
                            },
                        },
                    },
                    version: '1.0',
                    cache_age: 86400,
                    description:
                        'Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France',
                    provider_name: 'Washington Post',
                    thumbnail_url:
                        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RJAEBZMIKJHPFHDOXCPNIF4VJI.jpg&w=1440',
                    thumbnail_width: 1440,
                    thumbnail_height: 960,
                },
                show_thumbnail: true,
                layout: 'vertical',
                new_tab: false,
            },
        ]}
    />
);

export const HorizontalLongTitleShortDescription: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal Long Title and Short Description:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                oembed: {
                    url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 66.6667%; padding-top: 120px;"><a href="https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.washingtonpost.com%2Ftravel%2Ftips%2Ffrance-travel-us-covid-restrictions%2F&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France',
                    author: 'Natalie B. Compton',
                    options: {
                        card: {
                            value: '',
                            values: {
                                small: 'Make it a small card',
                            },
                        },
                    },
                    version: '1.0',
                    cache_age: 86400,
                    description: 'Short description',
                    provider_name: 'Washington Post',
                    thumbnail_url:
                        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RJAEBZMIKJHPFHDOXCPNIF4VJI.jpg&w=1440',
                    thumbnail_width: 1440,
                    thumbnail_height: 960,
                },
                show_thumbnail: true,
                layout: 'horizontal',
                new_tab: false,
            },
        ]}
    />
);

export const HorizontalShortTitleLongDescription: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal Short Title and Long Description:',
                    },
                ],
            },
            {
                type: 'bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: '3d497238-9bb3-478c-89e0-13dda44977cd',
                url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                oembed: {
                    url: 'https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/',
                    html: '<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 66.6667%; padding-top: 120px;"><a href="https://www.washingtonpost.com/travel/tips/france-travel-us-covid-restrictions/" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.washingtonpost.com%2Ftravel%2Ftips%2Ffrance-travel-us-covid-restrictions%2F&key=8fe6cdec03482ac31f27a6ae8ea2fb3f"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>',
                    type: 'rich',
                    title: 'Everything you need',
                    author: 'Natalie B. Compton',
                    options: {
                        card: {
                            value: '',
                            values: {
                                small: 'Make it a small card',
                            },
                        },
                    },
                    version: '1.0',
                    cache_age: 86400,
                    description:
                        'Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France Everything you need to know about traveling to France',
                    provider_name: 'Washington Post',
                    thumbnail_url:
                        'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RJAEBZMIKJHPFHDOXCPNIF4VJI.jpg&w=1440',
                    thumbnail_width: 1440,
                    thumbnail_height: 960,
                },
                show_thumbnail: true,
                layout: 'horizontal',
                new_tab: false,
            },
        ]}
    />
);

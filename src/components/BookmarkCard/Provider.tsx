import React from 'react';

interface ProviderProps {
    url: string;
    providerUrl?: string;
    providerName?: string;
    showUrl: boolean;
}

export function Provider({ url, providerUrl, providerName, showUrl }: ProviderProps) {
    const favicon = `https://avatars-cdn.prezly.com/favicon?url=${url}?ideal_height=32`;
    const href = showUrl ? url : homepage(providerUrl || url);
    const provider = showUrl ? url : providerName || hostname(providerUrl || url);

    return (
        <a
            className={'prezly-slate-bookmark-card-component__provider'}
            rel="noopener noreferrer"
            target="_blank"
            href={href}
        >
            <img
                className={'prezly-slate-bookmark-card-component__providerIcon'}
                src={favicon}
                alt={`${provider} favicon`}
                aria-hidden="true"
            />
            <span className={'prezly-slate-bookmark-card-component__providerName'}>{provider}</span>
        </a>
    );
}

function hostname(url: string): string {
    const { host } = new URL(url);
    return host;
}

function homepage(url: string): string {
    const { origin } = new URL(url);
    return origin;
}

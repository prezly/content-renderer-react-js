import React from 'react';
import { normalizeUrl } from '../../lib';
import { Link } from '../Link';

interface ProviderProps {
    url: string;
    providerUrl?: string;
    providerName?: string;
    showUrl: boolean;
}

export function Provider({ url, providerUrl, providerName, showUrl }: ProviderProps) {
    const favicon = `https://avatars-cdn.prezly.com/favicon?url=${encodeURIComponent(url)}?ideal_height=32`;
    const href = showUrl ? url : homepage(providerUrl || url);
    const provider = showUrl ? url : providerName || hostname(providerUrl || url);

    return (
        <Link className={'prezly-slate-bookmark-card-component__provider'} href={href} newTab>
            <img
                className={'prezly-slate-bookmark-card-component__providerIcon'}
                src={favicon}
                alt={`${provider} favicon`}
                aria-hidden="true"
            />
            <span className={'prezly-slate-bookmark-card-component__providerName'}>{provider}</span>
        </Link>
    );
}

function hostname(url: string): string {
    const { host } = new URL(normalizeUrl(url));
    return host;
}

function homepage(url: string): string {
    const { origin } = new URL(normalizeUrl(url));
    return origin;
}

'use client';

import type { ForwardedRef, HTMLAttributes, ScriptHTMLAttributes } from 'react';
import { forwardRef, memo, useEffect, useMemo, useRef } from 'react';

import { enableIframelyPlayerJs, listenForPlayerJsPlay } from '../lib';

interface Props extends HTMLAttributes<HTMLDivElement> {
    html: string;
    onError: () => void;
    onPlay?: () => void;
}

const IFRAMELY_EMBED_SCRIPT_SRC = '//cdn.iframe.ly/embed.js';

export function HtmlInjection(props: Props) {
    const { html, onError, onPlay, ...attrs } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    const isPlayTracked = onPlay !== undefined;
    const trackableHtml = useMemo(
        () => (isPlayTracked ? enableIframelyPlayerJs(html) : html),
        [html, isPlayTracked],
    );

    const strippedHtml = useScripts(trackableHtml, onError);

    // biome-ignore lint/correctness/useExhaustiveDependencies: the effect is meant to re-run on html changes only
    useEffect(() => {
        if (!containerRef.current || !onPlay) {
            return;
        }

        return listenForPlayerJsPlay(containerRef.current, onPlay);
    }, [onPlay, strippedHtml]);

    return <MemoHtml ref={containerRef} {...attrs} html={strippedHtml} />;
}

const MemoHtml = memo(
    forwardRef(
        (
            { html, ...restProps }: HTMLAttributes<HTMLDivElement> & { html: string },
            ref: ForwardedRef<HTMLDivElement>,
        ) => <div ref={ref} {...restProps} dangerouslySetInnerHTML={{ __html: html }} />,
    ),
);

MemoHtml.displayName = 'MemoHtml';

function useScripts(html: Props['html'], onError: Props['onError']) {
    const [strippedHtml, scriptsAttributes] = useMemo(() => {
        if (typeof document === 'undefined') {
            return [html, []];
        }

        const container = document.createElement('div');
        container.innerHTML = html;

        const scripts = Array.from(container.getElementsByTagName('script'));

        const attributes: ScriptHTMLAttributes<HTMLScriptElement>[] = scripts.map((script) =>
            Array.from(script.attributes).reduce(
                (agg, { name, value }) => ({ ...agg, [name]: value }),
                {},
            ),
        );

        scripts.forEach((script) => script.remove());

        const resultHtml = container.innerHTML;
        container.remove();

        return [resultHtml, attributes];
    }, [html]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: the effect is meant to re-run on html changes only
    useEffect(() => {
        scriptsAttributes.forEach((attributes) => {
            if (attributes.src && document.querySelector(`script[src="${attributes.src}"]`)) {
                return;
            }

            const script = document.createElement('script');
            setScriptAttributes(script, attributes);

            script.addEventListener('error', onError);

            // Iframely docs advise to insert their embed script before other scripts
            if (attributes.src === IFRAMELY_EMBED_SCRIPT_SRC) {
                const firstScript = document.querySelectorAll('body > script')[0];
                if (firstScript?.parentNode) {
                    firstScript.parentNode.insertBefore(script, firstScript);
                    return;
                }
            }

            document.body.appendChild(script);
        });

        if (typeof iframely !== 'undefined') {
            iframely.load();
        }
        // TODO: Address this. Simply adding `onError` to the deps might introduce an infinite loop.
    }, [scriptsAttributes]);

    return strippedHtml;
}

function setScriptAttributes(
    script: HTMLScriptElement,
    attributes: ScriptHTMLAttributes<HTMLScriptElement>,
): void {
    Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
}

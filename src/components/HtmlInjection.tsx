'use client';

import type { ForwardedRef, HTMLAttributes, ScriptHTMLAttributes } from 'react';
import { forwardRef, memo, useEffect, useMemo, useRef } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    html: string;
    onError: () => void;
    onPlay?: () => void;
}

const IFRAMELY_EMBED_SCRIPT_SRC = '//cdn.iframe.ly/embed.js';

export function HtmlInjection(props: Props) {
    const { html, onError, onPlay, ...attrs } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    const strippedHtml = useScripts(html, onError);

    useEffect(() => {
        if (!containerRef.current || !onPlay) {
            return;
        }

        import('player.js').then((playerjs) => {
            const nodes = containerRef.current?.getElementsByTagName('iframe');
            const iframes = Array.from(nodes ?? []);
            iframes.forEach((iframe) => {
                iframe.addEventListener('load', () => {
                    const player = new playerjs.Player(iframe);
                    player.on('play', onPlay);
                });
            });
        });
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
                const firstScript = document.body.querySelectorAll('body > script')[0];
                if (firstScript && firstScript.parentNode) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scriptsAttributes]);

    return strippedHtml;
}

function setScriptAttributes(
    script: HTMLScriptElement,
    attributes: ScriptHTMLAttributes<HTMLScriptElement>,
): void {
    Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
}

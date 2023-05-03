import type { HTMLAttributes, ScriptHTMLAttributes } from 'react';
import { useEffect, useMemo } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    html: string;
    onError: () => void;
}

const IFRAMELY_EMBED_SCRIPT_SRC = '//cdn.iframe.ly/embed.js';

export function HtmlInjection(props: Props) {
    const { html, onError, ...attrs } = props;

    const strippedHtml = useScripts(html, onError);

    return <div {...attrs} dangerouslySetInnerHTML={{ __html: strippedHtml }} />;
}

function useScripts(html: Props['html'], onError: Props['onError']) {
    const [strippedHtml, scriptsAttributes] = useMemo(() => {
        if (typeof document === 'undefined') {
            return [html, []];
        }

        const container = document.createElement('div');
        container.innerHTML = html;

        const scripts = Array.from(container.getElementsByTagName('script'));

        const scriptsAttributes: ScriptHTMLAttributes<HTMLScriptElement>[] = scripts.map((script) =>
            Array.from(script.attributes).reduce(
                (agg, { name, value }) => ({ ...agg, [name]: value }),
                {},
            ),
        );

        scripts.forEach((script) => script.remove());

        const strippedHtml = container.innerHTML;
        container.remove();

        return [strippedHtml, scriptsAttributes];
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
                const firstScript = document.body.getElementsByTagName('script')[0];
                if (firstScript) {
                    document.body.insertBefore(script, firstScript);
                    return;
                }
            }

            document.body.appendChild(script);
        });

        if (typeof iframely !== 'undefined') {
            iframely.load();
        }
    }, [scriptsAttributes]);

    return strippedHtml;
}

function setScriptAttributes(
    script: HTMLScriptElement,
    attributes: ScriptHTMLAttributes<HTMLScriptElement>,
): void {
    Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
}

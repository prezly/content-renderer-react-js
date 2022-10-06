import React, { HTMLAttributes, ScriptHTMLAttributes, useEffect, useMemo } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    html: string;
    onError: () => void;
}

export function HtmlInjection(props: Props) {
    const { html, onError, ...attrs } = props;

    const strippedHtml = useScripts(html, onError);

    return <div {...attrs} dangerouslySetInnerHTML={{ __html: strippedHtml }} />;
}

function useScripts(html: Props['html'], onError: Props['onError']) {
    const [strippedHtml, scriptsAttributes] = useMemo(() => {
        const container = document.createElement('div');
        container.innerHTML = html;

        const scripts = Array.from(container.getElementsByTagName('script'));

        const scriptsAttributes: ScriptHTMLAttributes<HTMLScriptElement>[] = scripts.map((script) => {
            return Array.from(script.attributes).reduce((agg, { name, value }) => ({ ...agg, [name]: value }), {});
        });

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

            const scriptElement = document.createElement('script');
            setScriptAttributes(scriptElement, attributes);

            scriptElement.addEventListener('error', onError);
            document.body.appendChild(scriptElement);
        });

        if (typeof iframely !== 'undefined') {
            iframely.load();
        }

        return;
    }, [scriptsAttributes]);

    return strippedHtml;
}

function setScriptAttributes(script: HTMLScriptElement, attributes: ScriptHTMLAttributes<HTMLScriptElement>): void {
    Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
}

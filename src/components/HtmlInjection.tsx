import React, { HTMLAttributes, ScriptHTMLAttributes, useEffect } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    html: string;
    onError: () => void;
}

export function HtmlInjection(props: Props) {
    const { html, onError, ...attrs } = props;

    useScripts(html, onError);

    return <div {...attrs} dangerouslySetInnerHTML={{ __html: html }} />;
}

function useScripts(html: Props['html'], onError: Props['onError']) {
    useEffect(() => {
        const container = document.createElement('div');
        container.innerHTML = html;

        const scripts: ScriptHTMLAttributes<HTMLScriptElement>[] = Array.from(
            container.getElementsByTagName('script'),
        ).map((script) => {
            return Array.from(script.attributes).reduce((agg, { name, value }) => ({ ...agg, [name]: value }), {});
        });

        container.remove();

        scripts.forEach((attributes) => {
            if (attributes.src && document.querySelector(`script[src="${attributes.src}"]`)) {
                return;
            }

            const script = document.createElement('script');
            setScriptAttributes(script, attributes);

            script.addEventListener('error', onError);
            document.body.appendChild(script);
        });

        if (typeof iframely !== 'undefined') {
            iframely.load();
        }

        return;
    }, [html]);
}

function setScriptAttributes(script: HTMLScriptElement, attributes: ScriptHTMLAttributes<HTMLScriptElement>): void {
    Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
}

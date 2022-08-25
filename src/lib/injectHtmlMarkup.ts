function copyScriptAttributes(source: HTMLScriptElement, target: HTMLScriptElement): void {
    Array.from(source.attributes).forEach(({ name, value }) => {
        target.setAttribute(name, value);
    });
    // eslint-disable-next-line no-param-reassign
    target.innerText = source.innerText;
}

export function injectHtmlMarkup(parameters: {
    html: string | undefined;
    onError: () => void;
    target: HTMLElement;
}): void {
    const { html, onError, target } = parameters;
    const container = document.createElement('div');
    container.innerHTML = html || '';
    const embedScripts = Array.from(container.getElementsByTagName('script'));

    embedScripts.forEach((embedScript) => {
        if (embedScript.src && document.querySelector(`script[src="${embedScript.src}"]`)) {
            // Skip scripts that were already included before
            return;
        }
        const script = document.createElement('script');
        copyScriptAttributes(embedScript, script);
        script.addEventListener('error', onError);

        document.body.appendChild(script);
        // Remove the original script so it's not loaded twice.
        embedScript.remove();
    });

    // eslint-disable-next-line no-param-reassign
    target.innerHTML = container.innerHTML;
}

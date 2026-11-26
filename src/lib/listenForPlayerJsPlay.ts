const PLAYERJS_CONTEXT = 'player.js';
const PLAYERJS_VERSION = '0.0.11';

interface PlayerJsMessage {
    context?: unknown;
    event?: unknown;
    listener?: unknown;
}

/**
 * Calls `onPlay` when a video frame inside `container` reports "play" through the
 * player.js protocol (https://github.com/embedly/player.js/blob/master/SPEC.rst).
 *
 * It does not wait for the frame's `load` or `ready` events: on a server-rendered page the
 * frame has often loaded and announced itself before this code runs. Player.js frames accept
 * listeners at any time and ignore duplicates, so we subscribe to every frame straight away,
 * and again whenever a frame announces it is ready (after it loads or reloads). Frames added
 * later, e.g. by the Iframely embed script, are picked up when they announce themselves.
 *
 * Returns a function that stops listening.
 */
export function listenForPlayerJsPlay(container: HTMLElement, onPlay: () => void): () => void {
    // Each call has its own listener ID, so a frame's "play" is counted once per call,
    // even if a previous subscription to the same frame is still registered.
    const listener = `prezly-play-${Math.random().toString(36).slice(2)}`;

    function getFrameWindows(): Window[] {
        return Array.from(container.getElementsByTagName('iframe'))
            .map((iframe) => iframe.contentWindow)
            .filter((frameWindow): frameWindow is Window => frameWindow !== null);
    }

    function send(frameWindow: Window, method: 'addEventListener' | 'removeEventListener') {
        const message = {
            context: PLAYERJS_CONTEXT,
            version: PLAYERJS_VERSION,
            method,
            value: 'play',
            listener,
        };
        // The message only asks to be notified of playback, so any origin may read it.
        // The frame's origin can't be derived from its `src`: Iframely may redirect the frame,
        // and a protocol-relative `src` resolves to `http:` on `http:` pages.
        frameWindow.postMessage(JSON.stringify(message), '*');
    }

    function handleMessage(event: MessageEvent) {
        const frameWindow = getFrameWindows().find((candidate) => candidate === event.source);
        if (!frameWindow) {
            return;
        }

        const message = parseMessage(event.data);
        if (message?.context !== PLAYERJS_CONTEXT) {
            return;
        }

        if (message.event === 'ready') {
            send(frameWindow, 'addEventListener');
        }

        if (message.event === 'play' && message.listener === listener) {
            onPlay();
        }
    }

    window.addEventListener('message', handleMessage);
    for (const frameWindow of getFrameWindows()) {
        send(frameWindow, 'addEventListener');
    }

    return () => {
        window.removeEventListener('message', handleMessage);
        for (const frameWindow of getFrameWindows()) {
            send(frameWindow, 'removeEventListener');
        }
    };
}

function parseMessage(data: unknown): PlayerJsMessage | undefined {
    if (typeof data === 'object' && data !== null) {
        return data;
    }

    if (typeof data !== 'string') {
        return undefined;
    }

    try {
        const parsed: unknown = JSON.parse(data);
        return typeof parsed === 'object' && parsed !== null ? parsed : undefined;
    } catch {
        return undefined;
    }
}

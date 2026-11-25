import { listenForPlayerJsPlay } from './listenForPlayerJsPlay';

interface SentMessage {
    method: string;
    value: string;
    listener: string;
}

function setUp() {
    const container = document.createElement('div');
    const iframe = document.createElement('iframe');
    container.appendChild(iframe);
    document.body.appendChild(container);

    const frameWindow = iframe.contentWindow as Window;
    const sent: SentMessage[] = [];
    frameWindow.postMessage = ((message: string) => {
        sent.push(JSON.parse(message));
    }) as Window['postMessage'];

    let plays = 0;
    const stop = listenForPlayerJsPlay(container, () => {
        plays += 1;
    });

    function receive(data: object, source: Window | null = frameWindow) {
        window.dispatchEvent(new MessageEvent('message', { data: JSON.stringify(data), source }));
    }

    return { container, frameWindow, sent, stop, receive, plays: () => plays };
}

describe('listenForPlayerJsPlay', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('subscribes to frames that are already loaded', () => {
        const { sent } = setUp();

        expect(sent).toEqual([
            expect.objectContaining({ method: 'addEventListener', value: 'play' }),
        ]);
    });

    it('subscribes again when a frame announces it is ready', () => {
        const { sent, receive } = setUp();

        receive({ context: 'player.js', event: 'ready', value: {} });

        expect(sent).toHaveLength(2);
        expect(sent[1]).toEqual(sent[0]);
    });

    it('calls onPlay when the frame reports play for its listener', () => {
        const { sent, receive, plays } = setUp();

        receive({ context: 'player.js', event: 'play', listener: sent[0].listener });

        expect(plays()).toBe(1);
    });

    it('ignores other listeners, other frames and other messages', () => {
        const { sent, receive, plays } = setUp();
        const otherFrame = document.createElement('iframe');
        document.body.appendChild(otherFrame);

        receive({ context: 'player.js', event: 'play', listener: 'someone-else' });
        receive(
            { context: 'player.js', event: 'play', listener: sent[0].listener },
            otherFrame.contentWindow,
        );
        receive({ method: 'onPlay', listener: sent[0].listener });

        expect(plays()).toBe(0);
    });

    it('picks up frames added after it started listening', () => {
        const { container, receive, plays } = setUp();
        const lateFrame = document.createElement('iframe');
        container.appendChild(lateFrame);
        const lateWindow = lateFrame.contentWindow as Window;
        const sent: SentMessage[] = [];
        lateWindow.postMessage = ((message: string) => {
            sent.push(JSON.parse(message));
        }) as Window['postMessage'];

        receive({ context: 'player.js', event: 'ready', value: {} }, lateWindow);
        receive({ context: 'player.js', event: 'play', listener: sent[0].listener }, lateWindow);

        expect(plays()).toBe(1);
    });

    it('unsubscribes and stops calling onPlay once stopped', () => {
        const { sent, stop, receive, plays } = setUp();

        stop();
        receive({ context: 'player.js', event: 'play', listener: sent[0].listener });

        expect(sent[1]).toEqual(
            expect.objectContaining({ method: 'removeEventListener', value: 'play' }),
        );
        expect(plays()).toBe(0);
    });
});

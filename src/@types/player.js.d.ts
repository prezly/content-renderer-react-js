declare module 'player.js' {
    declare class Player {
        constructor(iframe: HTMLIFrameElement);

        on(event: 'play', callback: () => void): void;
    }

    export const Player;
}

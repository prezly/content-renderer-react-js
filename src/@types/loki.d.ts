declare module '@loki/create-async-callback' {
    declare function callback(): void;

    export default () => callback;
}

declare module '@loki/is-loki-running' {
    export default () => boolean;
}

/**
 * Matches the address of an Iframely frame in an `src` or `data-iframely-url` attribute,
 * on any Iframely host (the list in Iframely's embed.js). The embed script itself
 * (e.g. `https://iframely.net/embed.js`) is not matched.
 */
const IFRAMELY_FRAME_ADDRESS =
    /\b(src|data-iframely-url)=(["'])((?:https?:)?\/\/(?:cdn\.iframe\.ly|iframe\.ly|if-cdn\.com|iframely\.net)\/api\/iframe\?[^"']*)\2/gi;

const PLAYERJS_OPTION = /[?&](?:amp;)?playerjs=/i;

/**
 * Iframely frames only report playback through the player.js protocol when their address
 * includes `playerjs=1`. Without it, Iframely hands the frame over to the provider's own
 * player (e.g. YouTube's embed), which never reports "play" to the page.
 *
 * This is a plain string transform, so server-rendered and client-rendered markup match
 * and the frame loads with the option from the start.
 */
export function enableIframelyPlayerJs(html: string): string {
    return html.replace(IFRAMELY_FRAME_ADDRESS, (attribute, name, quote, address) => {
        if (PLAYERJS_OPTION.test(address)) {
            return attribute;
        }

        return `${name}=${quote}${address}&amp;playerjs=1${quote}`;
    });
}

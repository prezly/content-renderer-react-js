export { getSocialHandles } from './getSocialHandles';
export { getUrl } from './getUrl';

export function getMailtoHref(email: string): string {
    return `mailto:${email}`;
}

export function getTelHref(phone: string): string {
    return `tel:${phone}`;
}

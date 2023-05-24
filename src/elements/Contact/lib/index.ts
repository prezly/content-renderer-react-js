export { getSocialHandles } from './getSocialHandles';
export { getUrl } from './getUrl';

export const getMailtoHref = (email: string): string => {
    return `mailto:${email}`;
};

export const getTelHref = (phone: string): string => {
    return `tel:${phone}`;
};

export function isEmptyText(text: string | null | undefined) {
    return !text?.replace(/\s+/g, '');
}

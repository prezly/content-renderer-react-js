export function isEmptyText(text: string | null | undefined) {
    return !(text && text.replace(/\s+/g, ''));
}

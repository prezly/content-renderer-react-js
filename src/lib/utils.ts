export function isEmptyText<T extends string | null | undefined>(
    text: T,
): text is Exclude<T, string> {
    return !(text && text.replace(/\s+/g, ''));
}

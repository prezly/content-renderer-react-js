const UNITS = ['bytes', 'KB', 'MB', 'GB'];

export function formatBytes(bytes: number | string): string {
    let l = 0;
    let n = typeof bytes === 'number' ? bytes : parseInt(bytes, 10) || 0;

    while (n >= 1024) {
        n /= 1024;
        l += 1;
    }

    return `${n.toFixed(n >= 10 || l < 1 ? 0 : 1)} ${UNITS[l]}`;
}

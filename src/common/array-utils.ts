export function shuffle<T>(array: T[]): T[] {
    const result = array;

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

export function chunk<T>(array: T[], size: number): T[][] {
    const result = [];

    for (let i = 0; i < Math.ceil(array.length / size); i++) {
        result.push(array.slice(size * i, size * i + size));
    }

    return result;
}
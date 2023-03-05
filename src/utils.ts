function getRandomIntBetween(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min))
}

function getRandomIntArrBetween(min: number, max: number, length: number): number[] {
    const arr: number[] = [];

    while (length > 0) {
        arr.push(getRandomIntBetween(min, max));
        length--;
    }

    return arr;
}

export const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

export const SMALL_A_UNICODE = 97;
export const SMALL_Z_UNICODE = 122;

export {getRandomIntBetween, getRandomIntArrBetween};
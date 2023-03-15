export function getRandomIntBetween(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min))
}

export function getRandomIntArrBetween(min: number, max: number, length: number): number[] {
    const arr: number[] = [];

    while (length > 0) {
        arr.push(getRandomIntBetween(min, max));
        length--;
    }

    return arr;
}

export async function pressKeyToContinue() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    await new Promise<void>(res => process.stdin.once('data', data => {
        const byteArr = [...data];
        if (byteArr.length > 0 && byteArr[0] === 3) {
            console.log("^C Bye!")
            process.exit(1);
        };

        process.stdin.setRawMode(false);
        res();
    }));
}

export async function yConfirmContinue() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    return await new Promise<boolean>(res => process.stdin.once('data', data => {
        const byteArr = [...data];
        if (byteArr.length > 0 && byteArr[0] === 3) {
            console.log("^C Bye!")
            process.exit(1);
        };

        process.stdin.setRawMode(false);
        
        res(byteArr[0] === 89 || byteArr[0] === 121);
    }));
}

export const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

export const SMALL_A_UNICODE = 97;
export const SMALL_Z_UNICODE = 122;
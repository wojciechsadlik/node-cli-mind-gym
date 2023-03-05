export function getRandomIntBetween(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
export function getRandomIntArrBetween(min, max, length) {
    const arr = [];
    while (length > 0) {
        arr.push(getRandomIntBetween(min, max));
        length--;
    }
    return arr;
}
export async function pressKeyToContinue() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    await new Promise(res => process.stdin.once('data', data => {
        const byteArr = [...data];
        if (byteArr.length > 0 && byteArr[0] === 3) {
            console.log("^C Bye!");
            process.exit(1);
        }
        ;
        process.stdin.setRawMode(false);
        res();
    }));
}
export const timer = (ms) => new Promise(res => setTimeout(res, ms));
export const SMALL_A_UNICODE = 97;
export const SMALL_Z_UNICODE = 122;


let list = ['cat', 'dog', 'bird', 'fish', 'cat', 'duck', 'chicken', 'dog'];
function distanceBetweenItem(arr, a, b) {
    let fa = undefined;
    let fb = undefined;

    for (let i = 0; i < list.length; i++) {
        if ((a === list[i] && fa === undefined) ||
            (a === list[i] && fa !== undefined && fb === undefined) ||
            (a === list[i] && fa !== undefined && fb !== undefined && Math.abs(fb - i) < Math.abs(fb - fa))
        ) {
            fa = i;
        }

        if ((b === list[i] && fb === undefined) ||
            (b === list[i] && fb !== undefined && fa === undefined) ||
            (b === list[i] && fb !== undefined && fa !== undefined && Math.abs(i - fa) < Math.abs(fb - fa))
        ) {
            fb = i;
        }
    }

    return Number.isNaN(fb - fa) ? -1 : Math.abs(fb - fa);
}

distanceBetweenItem(list, 'dog', 'cat'); // 1
distanceBetweenItem(list, 'dog', 'chicken'); // 1
distanceBetweenItem(list, 'dog', 'duck'); // 2
distanceBetweenItem(list, 'dog', 'dog'); // 0
distanceBetweenItem(list, 'dog', 'dog2'); // -1

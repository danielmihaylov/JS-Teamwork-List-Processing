(function () {
    let theArray = [];
    let initialized = false;
    let output = document.getElementById("output");
    let input = document.getElementById("input");
    document.getElementById("submit").addEventListener("click", submit);
    input.addEventListener("keypress", (e) => e.code === "Enter" ? submit() : "");
    let commands = {
        reverse: reverse,
        sort: sort,
        count: count,
        end: end,
        append: append,
        prepend: prepend
    };

    function submit() {
        let commandTokens = input.value.split(" ").filter(e => e !== "");
        console.log("Submitted: " + commandTokens);
        if (!initialized) {
            theArray = commandTokens.slice(0);
            input.value = "";
            initialized = true;
            output.value += theArray.join(" ") + "\n";
            return;
        }
        try {
            commands[commandTokens[0]](commandTokens.slice(1));
        } catch (err) {
            output.value += "Error: invalid command" + "\n";
        } finally {
            input.value = "";
        }
    }

    function deleteAt(arr, indexer) {
        let index = Number(indexer);

        validateIndex(arr, index);

        arr = arr.slice(0, index).concat(arr.slice(index + 1)).slice(0);
        return arr
    }

    function rollRight(arr) {
        arr = arr.slice(arr.length - 1).concat(arr.slice(0, arr.length - 1)).slice(0);
        return arr
    }

    function rollLeft(arr) {
        arr = arr.slice(1).concat(arr.slice(0, 1)).slice(0);
        return arr
    }

    function insertAt(arr, indexer, item) {
        let index = Number(indexer);
        validateIndex(arr, index, true);
        arr = arr.slice(0, index).concat([item]).concat(arr.slice(index)).slice(0);
        return arr
    }

    function validateIndex(arr, index, isInsert = false) {
        if (isNaN(index)) {
            throw new Error(`Error: invalid type.`)
        }
        if (index < 0) {
            throw new Error(`Error: invalid index ${index}.`)
        }

        if (isInsert) {
            if (index > arr.length) {
                throw new Error(`Error: invalid index ${index}.`)
            }
        } else if (index >= arr.length) {
            throw new Error(`Error: invalid index ${index}.`)
        }
    }

    //Georgi Andonov
    function sort(args) {
        if (args.length !== 0) {
            output.value += "Error: invalid command parameters" + "\n";
            return
        }

        theArray.sort();
        output.value += theArray.join(" ") + "\n";
    }

    //Georgi Andonov
    function count(args) {
        if (args.length === 0 || args.length > 1) {
            output.value += "Error: invalid command parameters" + "\n";
            return
        }

        let count = 0;
        let stringPar = args[0];
        for (let elem of theArray) {
            if (elem == stringPar) {
                count++;
            }
        }
        output.value += count + '\n';
    }

    //Georgi Andonov
    function end(args) {
        if (args.length > 0) {
            output.value += "Error: invalid command parameters" + "\n";
            return
        }

        output.value += 'Finished\n';
    }

    //Daniel Mihaylov
    function append(args) {
        if (args.length > 1) {
            output.value += ("Error: invalid command parameters" + '\n');
            return;
        }
        theArray.push(args);
        output.value += theArray.toString() + '\n';
    }

    //Daniel Mihaylov
    function prepend(args) {
        if (args.length > 1) {
            output.value += ("Error: invalid command parameters" + '\n');
            return;
        }
        theArray.unshift(args);
        output.value += theArray.toString() + '\n';
    }

    //Daniel Mihaylov
    function reverse(args) {
        if (args > 0) {
            output.value += ("Error: invalid command parameters" + '\n');
            return;
        }
        output.value += theArray.reverse().toString() + '\n';
    }
})();

module.exports = {deleteAt, rollRight, rollLeft, insertAt, validateIndex, sort, count, end};


(function () {
    let theArray = [];
    let initialized = false;
    let output = document.getElementById("output");
    let input = document.getElementById("input");
    document.getElementById("submit").addEventListener("click", submit);
    input.addEventListener("keypress", (e) => e.code === "Enter" ? submit() : "");
    let commands = {
        reverse: function () {
            theArray.reverse();
            output.value += theArray.join(" ") + "\n";
        }
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
}());

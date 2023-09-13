const lengthSlider = document.querySelector(".pass-length input"),
    options = document.querySelectorAll(".option input"),
    passwordInput = document.querySelector(".input-box input"),
    generateBtn = document.querySelector(".generate-btn");

const characters = { // object of letters, numbers & symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}
//TODO cleanup code
const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => { // looping through each option's checkbox
        if (option.checked) { // if checkbox is checked
            // if checkbox id isn't exc-duplicate && spaces
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                // adding particular key value from character object to staticPassword
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") { // if checkbox id is spaces
                staticPassword += `  ${staticPassword}  `; // adding space at the beginning & end of staticPassword
            } else { // else pass true value to excludeDuplicate
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        // getting random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) { // if excludeDuplicate is true
            // if randomPassword doesn't contains the current random character or randomChar is equal 
            // to space " " then add random character to randomPassword else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { // else add random character to randomPassword
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword; // passing randomPassword to passwordInput value
}

// const upadatePassIndicator = () => {
//     // if lengthSlider value is less than 8 then pass "weak" as passIndicator id else if lengthSlider 
//     // value is less than 16 then pass "medium" as id else pass "strong" as id
//     passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
// }

const updateSlider = () => {
    // passing slider value as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    // upadatePassIndicator();
}
updateSlider();
function copy() {
    // Get the text field
    var copyText = document.getElementById("password");

    // Select the text field's content
    copyText.select();

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Notify the user that the text has been copied
    // alert("Copied the text: " + copyText.value);
}



lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
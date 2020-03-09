// Special Characters Array
var specialCharacters = [
    "@",
    "%",
    "+",
    "\\",
    "/",
    "'",
    "!",
    "#",
    "$",
    "^",
    "?",
    ":",
    ",",
    ")",
    "(",
    "}",
    "{",
    "]",
    "[",
    "~",
    "-",
    "_",
    "."
];

//Numbers Array
var numericCharacters = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
];

//Lowercase Letters Array
var lowerCasedCharacters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];

//Uppercase Letters Array
var upperCasedCharacters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];

//Function for Password Option Prompts
function getPasswordOptions() {
    //  This var stores the password length. parseInt changes strings to integers.
    var length = parseInt(prompt(
        "Choose the number of characters for your password"
    ));

    //  Check to see if password length was entered as a number. Otherwise end prompt.
    if (isNaN(length) === true) {
        alert("Password length must be entered as a number");
        return;
    }

    //Check if password meets minimum length requirement
    if (length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    //Check if password meets max length requirement
    if (length > 128) {
        alert("Password cannot be greater than 128 characters");
        return;
    }

    //Confirms to see what options the user wants to include in their password. If all 4 confirms = false, application ends.
    var hasSpecialCharacters = confirm("Click OK to include special characters");

    var hasNumericCharacters = confirm("Click OK to include numeric characters");

    var haslowerCasedCharacters = confirm("Click OK to include lowercase characters");

    var hasUpperCasedCharacters = confirm("Click OK to include uppercase characters");

    //Checks to see if user chose not to include any type of characters. App ends if all are false
    if (
        hasSpecialCharacters === false &&
        hasNumericCharacters === false &&
        haslowerCasedCharacters === false &&
        hasUpperCasedCharacters === false
    ) {
        alert("Must choose at least 1 characters type");
        return;
    }

    //Store user input in this object
    var passwordOptions = {
        length: length,
        hasSpecialCharacters: hasSpecialCharacters,
        hasNumericCharacters: hasNumericCharacters,
        haslowerCasedCharacters: haslowerCasedCharacters,
        hasUpperCasedCharacters: hasUpperCasedCharacters
    };

    return passwordOptions;
}

//Function for getting random element from an array
function getRandom(arr) {
    var randIndex = Math.floor(Math.random() * arr.length);
    var randElement = arr[randIndex];

    return randElement;
}

//Function to create password with user input
function generatePassword() {
    var options = getPasswordOptions();
    //Var to store password in an array while it's being created
    var result = [];

    //Array to store character types to included in password
    var possibleCharacters = [];

    //Array to contain at least 1 type of selected character to ensure each will be used

    var guaranteedCharacters = [];

    //Conditional statement will join array of special characters to array of possible characters based on user preferences.
    //.concat joins 2 arrays into one. 
    //Push new random special characters to guaranteedCharacters

    if (options.hasSpecialCharacters) {
        possibleCharacters = possibleCharacters.concat(specialCharacters);
        guaranteedCharacters.push(getRandom(specialCharacters));
    }

    //Conditional statement will join array of numeric characters to array of possible characters based on user preferences.
    //.concat joins 2 arrays into one. 
    //Push new random numeric characters to guaranteedCharacters
    if (options.hasNumericCharacters) {
        possibleCharacters = possibleCharacters.concat(numericCharacters);
        guaranteedCharacters.push(getRandom(numericCharacters));
    }

    //Conditional statement will join array of lower-cased characters to array of possible characters based on user preferences.
    //.concat joins 2 arrays into one. 
    //Push new random lower-cased characters to guaranteedCharacters
    if (options.hasLowerCasedCharacters) {
        possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
        guaranteedCharacters.push(getRandom(lowerCasedCharacters));
    }

    //Conditional statement will join array of upper-cased characters to array of possible characters based on user preferences.
    //.concat joins 2 arrays into one. 
    //Push new random upper-cased characters to guaranteedCharacters
    if (options.hasUpperCasedCharacters) {
        possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
        guaranteedCharacters.push(getRandom(upperCasedCharacters));
    }

    //For loop to get password length from options object, select random options from
    //the possible characters array and add all of those together to get var result.
    for (var i = 0; i < options.length; i++) {
        var possibleCharacter = getRandom(possibleCharacters);

        result.push(possibleCharacter);
    }

    //Include at least 1 of each guaranteed character in result
    for (var i = 0; i < guaranteedCharacters.length; i++) {
        result[i] = guaranteedCharacters[i];
    }

    return result.join("");
}

//Make references to #copy and #generate elements
var copyBtn = document.querySelector("#copy");
var generateBtn = document.querySelector("#generate");

//Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");


passwordText.value = password;


copyBtn.removeAttribute("disabled");
//focus just colors an html element to let the user know they clicked it.
//In this case, the copy button will be colored after they their password.
copyBtn.focus();
}

function copyToClipboard() {
    var passwordText = document.querySelecter("#password");

    passwordText.select();
    document.execCommand("copy");

    alert(
        "Your password" + passwordText.value + "was copied to your clipboard."
    );
}

//Add event listening to generate button
generateBtn.addEventListener("click", writePassword);

//Add event listener to copy button
copyBtn.addEventListener("click", copyToClipboard);
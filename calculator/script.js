
const allKeys = Array.from(document.getElementsByClassName('keys')[0].children);

// Naming all the keys, same as their id
allKeys.forEach(element => {
	element.style.gridArea = element.id;
});

// Element Objects
var topTextElement = document.querySelector('.top-text');
var bottomTextElement = document.querySelector('.bottom-text div');


// clearing the bottom textfield
function clearLatest() {
	document.querySelector('.bottom-text div').innerHTML = '';
}

// clearing both textfields
function clearAll() {
	clearLatest();
	topTextElement.innerHTML = '';
}

// Enter to the textfield
function enterDigit(value) {
	bottomTextElement.style.color = 'white';
	bottomTextElement.innerHTML += value;
}

// Function to reverse a string
function reverseString(string) {
    let reversed = '';
    while (string) {
        reversed += string[string.length - 1];
        string = string.slice(0, -1);
    }
    return reversed;
}

// Find the secondlast index of occurence of an operator
function SecondLastIndexOf(string) {

	let count = 0;
	let negativeIndex = 0;

	for (let x of reverseString(string)) {
		if (x === '+' || x === '-' || x === 'x' || x === '÷') {
			if (count === 1) {
				return string.length - negativeIndex;
			} else {
				count++;
			}
		}
		negativeIndex++;
	}
}

// Backspace Function
function backspaceDigit() {

	bottomTextElement.style.color = 'white';

	if (bottomTextElement.innerHTML.trim() === '') {

		if (topTextElement.innerHTML.trim() !== '') {
			const secondLastIndex = SecondLastIndexOf(topTextElement.innerHTML) + 1;
			const slicedValue = topTextElement.innerHTML.slice(secondLastIndex, topTextElement.innerHTML.length - 2).trim();
			topTextElement.innerHTML = topTextElement.innerHTML.slice(0, secondLastIndex);
			bottomTextElement.innerHTML = slicedValue;
		}

	} else {

		if (bottomTextElement.innerHTML.trim() === 'Invalid!') {
			bottomTextElement.innerHTML = '';
		} else {
			bottomTextElement.innerHTML = bottomTextElement.innerHTML.trim().slice(0, -1);
		}
	}
}

// Splitting digits according to operators
function splitDigits(value) {
	
	const slicedValue = bottomTextElement.innerHTML.slice(0, bottomTextElement.innerHTML.lastIndexOf(value) + 2);
	
	bottomTextElement.innerHTML = '';
	topTextElement.innerHTML += slicedValue;
}

// Solve for the final value
function solveEquals() {
	if (bottomTextElement !== 'Invalid!') {
		const value = topTextElement.innerHTML + bottomTextElement.innerHTML;
		const replacingValues = {
			'π' : "Math.PI",
			'x' : '*',
			'÷' : '/',
			'^' : '**'
		};
		finalValue = value.replace(/π|\^|x|÷/gi, function(matched){
			return replacingValues[matched];
		});

		try {
			bottomTextElement.innerHTML = eval(finalValue);
			bottomTextElement.style.color = 'lightgreen';
		}
		catch {
			bottomTextElement.innerHTML = '';
			invalidError();
		}
		topTextElement.innerHTML = value;
	}
}

// Functions to blink red color on the separator
function redBlink(separator) {
	return new Promise(resolve => {
		separator.style.animationName = 'invalid-border-blink';
		separator.style.animationDuration = '1s';
		separator.style.animationDirection = 'normal';
		separator.style.animationIterationCount = '2';
		setTimeout(() => {
			resolve();
		}, 2000);
	})
	
}
async function invalidError() {
	const separator = document.querySelector('.bottom-text');
	await redBlink(separator);
	separator.style.animationName = 'none';
}	
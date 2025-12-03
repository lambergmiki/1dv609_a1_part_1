//Java Version 1 Correct Password
class SwedishSocialSecurityNumber {
	#helper;
	#ssn;

	constructor(stringInput, helper) {
		this.#helper = helper;

		const trimmedSS = stringInput.trim();

		if (helper.isCorrectLength(trimmedSS) === false) {
			throw new Error("To short, must be 11 characters");
		}
		if (helper.isCorrectFormat(trimmedSS) === false) {
			throw new Error("Incorrect format, must be: YYMMDD-XXXX");
		}

		this.#ssn = trimmedSS;

		if (helper.isValidMonth(this.getMonth()) === false) {
			throw new Error("Invalid month in SSN");
		}
		if (helper.isValidDay(this.getDay()) === false) {
			throw new Error("Invalid day in SSN");
		}
		if (helper.luhnisCorrect(this.#ssn) === false) {
			throw new Error("Invalid SSN according to Luhn's algorithm");
		}
	}

	getYear() {
		return this.#ssn.substring(0, 2); //YYMMDD-XXXX
	}

	getMonth() {
		return this.#ssn.substring(2, 4);
	}

	getDay() {
		return this.#ssn.substring(4, 6);
	}

	getSerialNumber() {
		return this.#ssn.substring(8, 11); // Returns the last 3, not 4, digits.
	}

	getSsn() {
		return this.#ssn;
	}
}

export { SwedishSocialSecurityNumber };

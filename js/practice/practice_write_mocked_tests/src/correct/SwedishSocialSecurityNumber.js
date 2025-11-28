//Java Version 1 Correct Password
class SwedishSocialSecurityNumber {
	#helper;
	#ssn;

	constructor(stringInput, helper) {
		this.#helper = helper;

		const trimmedSS = stringInput.trim();

		// Fixed, throws on false
		if (!helper.isCorrectLength(trimmedSS)) {
			throw new Error("Too short, must be 11 characters");
		}

		// Fixed, throws on false
		if (!helper.isCorrectFormat(trimmedSS)) {
			throw new Error("Incorrect format, must be: YYMMDD-XXXX");
		}

		this.#ssn = trimmedSS;

		if (helper.isValidMonth(this.getMonth()) === false) {
			throw new Error("Invalid month in SSN");
		}
		if (helper.isValidDay(this.getDay()) === false) {
			throw new Error("Invalid month in SSN");
		}
		if (helper.luhnisCorrect(this.#ssn) === false) {
			throw new Error("Invalid SSN according to Luhn's algorithm");
		}
	}
	getYear() {
		return this.#ssn.substring(0, 2);
	}

	getMonth() {
		return this.#ssn.substring(2, 4);
	}

	getDay() {
		return this.#ssn.substring(4, 6);
	}

	getSerialNumber() {
		return this.#ssn.substring(7, 11);
	}
}

export { SwedishSocialSecurityNumber };

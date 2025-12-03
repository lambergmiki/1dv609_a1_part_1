import { jest } from "@jest/globals";
import { SSNHelper } from "../src/correct/SSNHelper";
import { SwedishSocialSecurityNumber } from "../src/correct/SwedishSocialSecurityNumber";
// import { SwedishSocialSecurityNumber } from "../src/bugs/BuggySwedishSocialSecurityNumberNoLenCheck";
// import { SwedishSocialSecurityNumber } from "../src/bugs/BuggySwedishSocialSecurityNumberNoTrim";
// import { SwedishSocialSecurityNumber } from "../src/bugs/BuggySwedishSocialSecurityNumberNoLuhn";
// import { SwedishSocialSecurityNumber } from "../src/bugs/BuggySwedishSocialSecurityNumberWrongYear";
// import { SwedishSocialSecurityNumber } from "../src/bugs/BuggySwedishSocialSecurityNumberWrongSsn";
// import { SwedishSocialSecurityNumber } from "../src/bugs/BuggySwedishSocialSecurityNumberWrongMonth";

describe("SwedishSocialSecurityNumber Tests", () => {
	let mockHelper;
	const validSsn = "930424-7050";

	beforeEach(() => {
		mockHelper = new SSNHelper();

		// Mocked functions
		mockHelper.isCorrectLength = jest.fn();
		mockHelper.isCorrectFormat = jest.fn();
		mockHelper.isValidMonth = jest.fn();
		mockHelper.isValidDay = jest.fn();
		mockHelper.luhnisCorrect = jest.fn();

		// Predefined as true
		mockHelper.isCorrectLength.mockReturnValue(true);
		mockHelper.isCorrectFormat.mockReturnValue(true);
		mockHelper.isValidMonth.mockReturnValue(true);
		mockHelper.isValidDay.mockReturnValue(true);
		mockHelper.luhnisCorrect.mockReturnValue(true);
	});

	// NumberNoLenCheck
	test("Constructor should throw Error if ssn length is not 11 characters", () => {
		const shortSsn = "930424-705";
		const longSsn = "930424-70505";

		mockHelper.isCorrectLength.mockReturnValue(false);

		expect(() => {
			new SwedishSocialSecurityNumber(longSsn, mockHelper);
		}).toThrow("To short, must be 11 characters");
	});

	// NumberNoTrim
	test("Constructor should throw Error if white space affects input", () => {
		const whitespaceSsn = "930424-7050 ";

		new SwedishSocialSecurityNumber(whitespaceSsn, mockHelper);

		expect(mockHelper.isCorrectLength).toHaveBeenCalledWith(validSsn);
	});

	// NumberNoLuhn
	test("Constructor should throw Error if Luhn method is not called", () => {
		new SwedishSocialSecurityNumber(validSsn, mockHelper);

		expect(mockHelper.luhnisCorrect).toHaveBeenCalledWith(validSsn);
	});

	// NumberWrongYear
	test("getYear() should not return the first two digits of the SSN", () => {
		const ssnMainClass = new SwedishSocialSecurityNumber(validSsn, mockHelper);

		const year = ssnMainClass.getYear();
		expect(year).toBe("93");
	});

	// NumberWrongSsn - Extra test for higher coverage
	test("getSerialNumber should return the last 4 digits (serial number) of the SSN", () => {
		const ssnMainClass = new SwedishSocialSecurityNumber(validSsn, mockHelper);

		const serialNumber = ssnMainClass.getSerialNumber();
		expect(serialNumber).toBe(validSsn.slice(7, 11)); // Expected output: 7050
	});

	// WrongMonth - Extra test for higher coverage, bug in helper class
	test("isValidMonth should throw Error if input fails isValidMonth of helper class", () => {
		const wrongMonthSsn = "931304-7050";

		mockHelper.isValidMonth.mockReturnValue(false);

		expect(() => {
			new SwedishSocialSecurityNumber(wrongMonthSsn, mockHelper);
		}).toThrow();
	});
});

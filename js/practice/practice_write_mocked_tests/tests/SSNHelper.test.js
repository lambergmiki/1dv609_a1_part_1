import { SSNHelper } from "../src/correct/SSNHelper";
// import { SSNHelper } from "../src/bugs/BuggySSNHelperAllowDayUpTo30";
// import { SSNHelper } from "../src/bugs/BuggySSNHelperAllowMonth0";
// import { SSNHelper } from "../src/bugs/BuggySSNHelperIncorrectFormat";
// import { SSNHelper } from "../src/bugs/BuggySSNHelperMessyLuhn";
// import { SSNHelper } from "../src/bugs/BuggySSNHelperWrongLength";

describe("SSNHelper Tests", () => {
	test("should return true if between 1-31", () => {
		const ssnHelper = new SSNHelper();
		expect(ssnHelper.isValidDay("31")).toBe(true);
	});
	test("isValidMonth should return false for input 0", () => {
		const ssnHelper = new SSNHelper();
		expect(ssnHelper.isValidMonth("0")).toBe(false);
	});
	test("isCorrectFormat should return false if format does not comply with regex", () => {
		const ssnHelper = new SSNHelper();
		expect(ssnHelper.isCorrectFormat("9304241234")).toBe(false);
	});
	// https:sv.wikipedia.org/wiki/Luhn-algoritmen
	test("luhnisCorrect should return false if the input is not a valid SSN", () => {
		const ssnHelper = new SSNHelper();
		expect(ssnHelper.luhnisCorrect("930424-7050")).toBe(true);
	});
	test("isCorrectLength should return false for input longer or shorter than 11 characters", () => {
		expect.assertions(3);
		const ssnHelper = new SSNHelper();
		expect(ssnHelper.isCorrectLength("930424-7050")).toBe(true);
		expect(ssnHelper.isCorrectLength("930424-70506")).toBe(false);
		expect(ssnHelper.isCorrectLength("930424-705")).toBe(false);
	});
});

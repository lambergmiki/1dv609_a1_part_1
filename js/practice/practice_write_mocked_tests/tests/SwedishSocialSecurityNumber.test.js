import { jest } from "@jest/globals";
import { SSNHelper } from "../src/correct/SSNHelper";
// import { SwedishSocialSecurityNumber } from "../src/correct/SwedishSocialSecurityNumber";
// import { SwedishSocialSecurityNumber } from "../src/bugs/BuggySwedishSocialSecurityNumberNoLenCheck";
// import { SwedishSocialSecurityNumber } from "../src/bugs/BuggySwedishSocialSecurityNumberNoTrim";

describe("SwedishSocialSecurityNumber Tests", () => {
	let mockHelper;

	beforeEach(() => {
		mockHelper = new SSNHelper();

		mockHelper.isCorrectLength = jest.fn();
		mockHelper.isCorrectFormat = jest.fn();
		mockHelper.isValidMonth = jest.fn();
		mockHelper.isValidDay = jest.fn();
		mockHelper.luhnisCorrect = jest.fn();
	});

	// NumberNoLenCheck
	// test("Constructor should throw Error if ssn length is invalid", () => {
	// 	mockHelper.isCorrectLength.mockReturnValue(false);

	// 	expect(() => {
	// 		new SwedishSocialSecurityNumber("930424-70505", mockHelper);
	// 	}).toThrow("Too short, must be 11 characters");

	// 	expect(mockHelper.isCorrectLength).toHaveBeenCalledWith("930424-70505");
	// });

	// NumberNoTrim
	// test("Constructor should throw Error if ssn format is invalid", () => {
	// 	mockHelper.isCorrectLength.mockReturnValue(true);
	// 	mockHelper.isCorrectFormat.mockReturnValue(false);

	// 	expect(() => {
	// 		new SwedishSocialSecurityNumber("930424-705x", mockHelper);
	// 	}).toThrow("Incorrect format, must be: YYMMDD-XXXX");

	// 	expect(mockHelper.isCorrectFormat).toHaveBeenCalledWith("930424-705x");
	// });
});

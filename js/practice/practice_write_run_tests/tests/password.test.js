// Select one of the Password versions to test

// import { Password } from "../src/BugDoesNotHash";
// import { Password } from "../src/BugDoesNotTrim";
// import { Password } from "../src/BugisPasswordAlwaysSame";
// import { Password } from "../src/BugMissingNumberCheck";
// import { Password } from "../src/BugMissingPasswordCheck";
// import { Password } from "../src/BugNeverContainsNumbers";
// import { Password } from "../src/BugToShortPassword";
// import { Password } from "../src/BugVeryShort";
// import { Password } from "../src/BugWrongHashingAlgorithm";
// import { Password } from "../src/BugWrongMessage";
import { Password } from "../src/Correct";

describe("Password class, test suite", () => {
	// BugDoesNotHash
	test("getPasswordHash() should return hashed password for entered password", () => {
		const pw = new Password("unhashedpassword123");
		const hashedPw = pw.getPasswordHash();
		expect(hashedPw).not.toBe("unhashedpassword123");
	});

	// BugDoesNotTrim
	test("Constructor of Password class should not trim white space", () => {
		const pw = new Password(" hehelookatthispassword123  ");
		const pw2 = new Password("hehelookatthispassword123");
		expect(pw.getPasswordHash()).toBe(pw2.getPasswordHash());
	});

	// BugisPasswordAlwaysSame
	test("isPasswordSame() should return false different passwords", () => {
		const pw = new Password("samePasswordMaybe123");
		const pw2 = new Password("samePasswordMaybe1234");
		expect(pw.isPasswordSame(pw2)).toBe(false);
	});

	/*
  Wrap in anonymous function because toThrow() only works on functions —
  it needs to call the code itself and catch errors.

  Can't be assigned to a variable first, because then the constructor is already executed
  and Jest doesn't intercept the throw.

  Jest only prints details for failures by default.
  Passing tests are just summarized (name + check mark + time).
*/
	// BugMissingNumberCheck
	test("Constructor should throw Exception for passwords without a number", () => {
		expect(() => new Password("passwordNoNumbers")).toThrow("No number found");
	});

	// BugToShortPassword - checks for a password with 11 characters
	test("Constructor should throw Exception for passwords shorter than 12 characters", () => {
		expect(() => new Password("password123")).toThrow("Too short password");
	});

	// BugVeryShort
	test("Constructor Should Thow Exception For Short Passwords", () => {
		expect(() => {
			new Password("abc1234");
		}).toThrow("Too short password");
	});

	// BugWrongHashingAlgorithm - checks that hash number is >= 20 digits long
	test("Hashing algorithm should produce a safe hash (>= 20 digits)", () => {
		const pw = new Password("hashedPassword123");
		const pw2 = new Password("hashedPassword123");

		expect(pw.getPasswordHash() && pw2.getPasswordHash()).toBeGreaterThan(20);
	});

	// BugWrongMessage
	test("Constructor should display 'Too short password' for too short input for password", () => {
		expect(() => new Password("shortpw123")).toThrow("Too short password");
	});
});

# Practice Writing and Running Tests with mocks

Most of the assignment works as the previous practice "run test" but now we have two classes with a dependency. We want to test these classes independently.

The previous task had private methods that normally cannot be tested directly. In this task we have extracted the private methods into a helper class where they are public. The two classes now needs to be tested in a way so that a failing test shows which of the classes that contains the bug.

SwedishSecurityNumber depends on the class SSNHelper who holds all the validation methods. A test for SwedishSecurityNumber should only test functionality in the SwedishSecurityNumber class, and not rely on SSNHelper. To accomplish this we can make use of "mocks".

A mock is a configurable class instance that acts as a object of SSNHelper but we can control its output in the test.

- Jest have mocking built in
- For Java you need to install mockito.

## Goals

- You should be able to test classes with dependencies
- You should be able to write tests with mocks

## Course material to support

- Developer Testing - Chapter 7 - 13
- Testing framework/tool online manuals for your framework/tools
- Mocking framework/tool online manuals for your framework/tools
- Course materials week 1-3

## Task 2: Write an optimized test suite for two classes

- Write a test suite for SwedishSecurityNumber class and another for the SSNHelper class
  A bug in the SwedishSecurityNumber must not fail due to a bug in SSNHelper.
- None of the tests in SwedishSecurityNumber should use instances of the SSNHelper class.
  - Test the Helper and SwedishSecurityNumber classes independently of each other
    - Tests for SwedishSecurityNumber should only fail if the bug is in SwedishSecurityNumber class
    - Tests for Helper should only fail if the bug is in Helper class
- Only one expect/assert/verify per test unless motivated
- Show tests and bug fail matrix as in previous task
- Add additional tests to increase coverage, but only if each test has value

  - Show that the additional tests has value by creating a bug that fails that test!
  - At least one additional test should be added!

- Artifacts to show during examination
  - Table below
  - A test suite for SwedishSecurityNumber that uses mocking and not the SSNHelper class itself
  - A test suite for SSNHelper.
  - A test per buggy version.
  - A set of tests to make sure coverage is high
    - An additional test

### Table for checking test suite bug coverage

| SUT                   | Test        | Correct SwedishSocialSecurityNumber | BuggySSNHelperWrongLength | Buggy Helper 2 | ... |     |
| --------------------- | ----------- | ----------------------------------- | ------------------------- | -------------- | --- | --- | --- |
| SwedishSecurityNumber | Test name 1 | ✅                                  |                           |                |     |     |
| SwedishSecurityNumber | Test name 2 | ✅                                  |                           |                |     |     |
| SSNHelper             | Test name 3 |                                     | ✅                        | ❌             |     |     |     |
| Coverage              |             | 100%                                | 100%                      | 100%           |     |     |

# Test tables, one per test suite

| SUT                         | Test                                             | Correct SwedishSocialSecurityNumber                         | Buggy NumberNoLenCheck | Buggy NumberNoTrim | Buggy NumberNoLuhn | Buggy NumberWrongYear | Buggy NumberWrongSsn | Buggy NumberWrongMonth |
| --------------------------- | ------------------------------------------------ | ----------------------------------------------------------- | ---------------------- | ------------------ | ------------------ | --------------------- | -------------------- | ---------------------- |
| SwedishSocialSecurityNumber | 1. Throws on incorrect length                    | ✅                                                          | ❌                     | ✅                 | ✅                 | ✅                    | ✅                   | ✅                     |
| SwedishSocialSecurityNumber | 2. Throws on trimming input                      | ✅                                                          | ✅                     | ❌                 | ✅                 | ✅                    | ✅                   | ✅                     |
| SwedishSocialSecurityNumber | 3. Throws if Luhn not called                     | ✅                                                          | ✅                     | ✅                 | ❌                 | ✅                    | ✅                   | ✅                     |
| SwedishSocialSecurityNumber | 4. getYear() returns correct year                | ✅                                                          | ✅                     | ✅                 | ✅                 | ❌                    | ✅                   | ✅                     |
| SwedishSocialSecurityNumber | 5. getSerialNumber returns correct serial number | ✅                                                          | ✅                     | ✅                 | ✅                 | ✅                    | ❌                   | ✅                     |
| SwedishSocialSecurityNumber | 6. Throws if invalid month                       | ✅                                                          | ✅                     | ✅                 | ✅                 | ✅                    | ✅                   | ❌                     |
| Coverage                    |                                                  | 77.77% statements, 70% branches, 83.33% funcs, 77.77% lines | -                      | -                  | -                  | -                     | -                    | -                      |

| SUT       | Test                                                | Correct SSNHelper                                       | BuggySSNHelperWrongLength | BuggySSNHelperWrongFormat | BuggySSNHelperNoLuhn |
| --------- | --------------------------------------------------- | ------------------------------------------------------- | ------------------------- | ------------------------- | -------------------- |
| SSNHelper | 1. isValidDay returns true for valid day            | ✅                                                      | ✅                        | ✅                        | ✅                   |
| SSNHelper | 2. isValidMonth returns false for 0                 | ✅                                                      | ✅                        | ✅                        | ✅                   |
| SSNHelper | 3. isCorrectFormat returns false for invalid format | ✅                                                      | ✅                        | ❌                        | ✅                   |
| SSNHelper | 4. luhnisCorrect returns false if invalid SSN       | ✅                                                      | ✅                        | ✅                        | ❌                   |
| SSNHelper | 5. isCorrectLength returns false for wrong length   | ✅                                                      | ❌                        | ✅                        | ✅                   |
| Coverage  |                                                     | 100% statements, 87.5% branches, 100% funcs, 100% lines | -                         | -                         | -                    |

# Test table, merged

### Table for checking test suite bug coverage

| SUT                         | Test                                                | Correct SwedishSocialSecurityNumber | Buggy NumberNoLenCheck | Buggy NumberNoTrim | Buggy NumberNoLuhn | Buggy NumberWrongYear | Buggy NumberWrongSsn | Buggy NumberWrongMonth | Correct SSNHelper | BuggySSNHelperWrongLength | BuggySSNHelperWrongFormat | BuggySSNHelperNoLuhn |
| --------------------------- | --------------------------------------------------- | ----------------------------------- | ---------------------- | ------------------ | ------------------ | --------------------- | -------------------- | ---------------------- | ----------------- | ------------------------- | ------------------------- | -------------------- |
| SwedishSocialSecurityNumber | 1. Throws on incorrect length                       | ✅                                  | ❌                     | ✅                 | ✅                 | ✅                    | ✅                   | ✅                     | -                 | -                         | -                         | -                    |
| SwedishSocialSecurityNumber | 2. Throws on trimming input                         | ✅                                  | ✅                     | ❌                 | ✅                 | ✅                    | ✅                   | ✅                     | -                 | -                         | -                         | -                    |
| SwedishSocialSecurityNumber | 3. Throws if Luhn not called                        | ✅                                  | ✅                     | ✅                 | ❌                 | ✅                    | ✅                   | ✅                     | -                 | -                         | -                         | -                    |
| SwedishSocialSecurityNumber | 4. getYear() returns correct year                   | ✅                                  | ✅                     | ✅                 | ✅                 | ❌                    | ✅                   | ✅                     | -                 | -                         | -                         | -                    |
| SwedishSocialSecurityNumber | 5. getSerialNumber returns correct serial number    | ✅                                  | ✅                     | ✅                 | ✅                 | ✅                    | ❌                   | ✅                     | -                 | -                         | -                         | -                    |
| SwedishSocialSecurityNumber | 6. Throws if invalid month                          | ✅                                  | ✅                     | ✅                 | ✅                 | ✅                    | ✅                   | ❌                     | -                 | -                         | -                         | -                    |
| SSNHelper                   | 7. isValidDay returns true for valid day            | -                                   | -                      | -                  | -                  | -                     | -                    | -                      | ✅                | ✅                        | ✅                        | ✅                   |
| SSNHelper                   | 8. isValidMonth returns false for 0                 | -                                   | -                      | -                  | -                  | -                     | -                    | -                      | ✅                | ✅                        | ✅                        | ✅                   |
| SSNHelper                   | 9. isCorrectFormat returns false for invalid format | -                                   | -                      | -                  | -                  | -                     | -                    | -                      | ✅                | ✅                        | ❌                        | ✅                   |
| SSNHelper                   | 10. luhnisCorrect returns false if invalid SSN      | -                                   | -                      | -                  | -                  | -                     | -                    | -                      | ✅                | ✅                        | ✅                        | ❌                   |
| SSNHelper                   | 11. isCorrectLength returns false for wrong length  | -                                   | -                      | -                  | -                  | -                     | -                    | -                      | ✅                | ❌                        | ✅                        | ✅                   |

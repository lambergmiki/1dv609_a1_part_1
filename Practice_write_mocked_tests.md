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

# Tables for checking test suite bug coverage, one per test suite (SSN and SSNHelper respectively)

### Preface

All test names to the right of `CorrectSwedishSocialSecurityNumber` are prefixed with `BuggySwedishSocialSecurityNumber` in the actual test folder.
The same applies to test suite #2, they are prefixed with `BuggySSNHelper` instead. They are shortened here for readability. `NumberWrongMonth` is the _additional_ test.

## Test suite #1

| SUT                         | Test                                                                             | Correct SwedishSocialSecurityNumber                         | NumberNoLenCheck                                      | NumberNoLuhn                                              | NumberNoTrim                                                | NumberWrongMonth\*                                            | NumberWrongSsn                                              | NumberWrongYear                                           |
| --------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| SwedishSocialSecurityNumber | 1. Constructor should throw Error if ssn length is not 11 characters             | ✅                                                          | ❌                                                    | ✅                                                        | ✅                                                          | ✅                                                            | ✅                                                          | ✅                                                        |
| SwedishSocialSecurityNumber | 2. Constructor should throw Error if Luhn method is not called                   | ✅                                                          | ✅                                                    | ❌                                                        | ✅                                                          | ✅                                                            | ✅                                                          | ✅                                                        |
| SwedishSocialSecurityNumber | 3. Constructor should throw Error if white space affects input                   | ✅                                                          | ✅                                                    | ✅                                                        | ❌                                                          | ✅                                                            | ✅                                                          | ✅                                                        |
| SwedishSocialSecurityNumber | 4. isValidMonth() should throw Error if input fails isValidMonth of helper class | ✅                                                          | ✅                                                    | ✅                                                        | ✅                                                          | ❌                                                            | ✅                                                          | ✅                                                        |
| SwedishSocialSecurityNumber | 5. getSerialNumber should return the last 4 digits of the SSN                    | ✅                                                          | ✅                                                    | ✅                                                        | ✅                                                          | ✅                                                            | ❌                                                          | ✅                                                        |
| SwedishSocialSecurityNumber | 6. getYear() should return the first two digits of the SSN                       | ✅                                                          | ✅                                                    | ✅                                                        | ✅                                                          | ✅                                                            | ✅                                                          | ❌                                                        |
| Coverage                    |                                                                                  | 77.77% statements, 70% branches, 83.33% funcs, 77.77% lines | 80% statements, 62.5% branches, 100% funcs, 80% lines | 86.66% statements, 75% branches, 100% funcs, 86.66% lines | 76.47% statements, 70% branches, 83.33% funcs, 76.47% lines | 68.75% statements, 62.5% branches, 66.66% funcs, 68.75% lines | 77.77% statements, 70% branches, 83.33% funcs, 77.77% lines | 82.35% statements, 70% branches, 100% funcs, 82.35% lines |

---

## Test suite #2

| SUT       | Test                                                                                  | Correct SSNHelper                                 | AllowDayUpTo30                                          | AllowMonth0                                            | IncorrectFormat                                   | MessyLuhn                                         | WrongLength                                       |
| --------- | ------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| SSNHelper | 1. isValidDay should return true if between 1-31                                      | ✅                                                | ❌                                                      | ✅                                                     | ✅                                                | ✅                                                | ✅                                                |
| SSNHelper | 2. isValidMonth should return false for input 0                                       | ✅                                                | ✅                                                      | ❌                                                     | ✅                                                | ✅                                                | ✅                                                |
| SSNHelper | 3. isCorrectFormat should return false if format does not comply with regex           | ✅                                                | ✅                                                      | ✅                                                     | ❌                                                | ✅                                                | ✅                                                |
| SSNHelper | 4. luhnisCorrect should return false if the input is not a valid SSN                  | ✅                                                | ✅                                                      | ✅                                                     | ✅                                                | ❌                                                | ✅                                                |
| SSNHelper | 5. isCorrectLength should return false for input longer or shorter than 11 characters | ✅                                                | ✅                                                      | ✅                                                     | ✅                                                | ✅                                                | ❌                                                |
| Coverage  |                                                                                       | 100% statements, 87.5% branches, 100% funcs, 100% | 100% statements, 87.5% branches, 100% funcs, 100% lines | 100% statements, 100% branches, 100% funcs, 100% lines | 100% statements, 87.5% branches, 100% funcs, 100% | 100% statements, 87.5% branches, 100% funcs, 100% | 100% statements, 87.5% branches, 100% funcs, 100% |

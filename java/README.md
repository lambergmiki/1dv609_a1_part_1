# Java Version

The Java project is arranged as follows:

* `/examination/` folder is placeholder for the examination, don't change it until then
* `/practice/` folder contains the code for the two practice tasks
* `/practice/*/app/src/main/java/com/lab/` contains correct and buggy versions of the system under test, you should not change these classes, but may need to read them
* `/practice/*/app/src/test/java/com/lab/` this is where you add your tests

## Project Structure

```
practice/
├── practice_with_run_tests/
│   ├── app/
│   │   ├── src/
│   │   │   ├── main/java/com/lab/
│   │   │   │   ├── Password.java              # Correct implementation
│   │   │   │   ├── BuggyPassword1.java        # Buggy version 1
│   │   │   │   ├── BuggyPassword2.java        # Buggy version 2
│   │   │   │   └── ...
│   │   │   └── test/java/com/lab/
│   │   │       └── PasswordTest.java          # Your tests go here
│   │   └── build.gradle
│   └── settings.gradle
└── practice_with_mocked_tests/
    ├── app/
    │   ├── src/
    │   │   ├── main/java/com/lab/
    │   │   │   ├── SSNHelper.java
    │   │   │   ├── SwedishSocialSecurityNumber.java
    │   │   │   └── Buggy*.java
    │   │   └── test/java/com/lab/
    │   │       └── SSNTest.java               # Your tests go here
    │   └── build.gradle
    └── settings.gradle
```

## Setup and Running Tests

Navigate to the Java project folder (replace * with either practice_with_run_tests or practice_with_mocked_tests):
```bash
cd java/practice/*/app/src/main/java/com/lab/
```

Build the project (downloads dependencies):
```bash
./gradlew build
```

Run all test suites:
```bash
./gradlew test
```

Run tests with detailed output:
```bash
./gradlew test --info
```

Run a specific test class:
```bash
./gradlew test --tests PasswordTest
```

Run tests for a specific test in a test file:
```bash
./gradlew test --tests PasswordTest.shouldAlwaysPass
```

## Example Output

```bash
PasswordTest > shouldThrowExceptionOnShortPassword() PASSED
PasswordTest > shouldThrowExceptionOnPasswordWithoutNumber() PASSED
PasswordTest > shouldAcceptValidPassword() PASSED

BUILD SUCCESSFUL in 2s
4 actionable tasks: 4 executed
```

## VS Code

If using VS Code:
1. Open the project folder
2. Navigate to any test file
3. Click "Run Test" button above test methods
4. Or right-click → "Run Java Tests"

## Common Commands

**Clean build:**
```bash
./gradlew clean build
```

**Run tests continuously (re-run on file changes):**
```bash
./gradlew test --continuous
```

**View test report:**
```bash
./gradlew test
# Then open: build/reports/tests/test/index.html
```

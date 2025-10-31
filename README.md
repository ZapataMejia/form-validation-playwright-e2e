# Form Validation Testing with Playwright

A comprehensive end-to-end testing suite for form validation scenarios using Playwright and TypeScript. This project demonstrates various form validation testing patterns including field validation, error handling, required fields, and input type validation.

## 📋 Overview

This project focuses on testing form validation across different scenarios:

- **Form Authentication Testing**: Complete login/logout flows with credential validation
- **Complex Form Validation**: Multi-field forms with required field validation, checkbox validation, and input format validation
- **Input Type Validation**: Testing different HTML input types (number, text, email, password) and their validation behaviors
- **Error Handling**: Validation of error messages, empty field handling, and submission blocking
- **User Experience**: Testing form interactions, field focus, and user feedback mechanisms

The project uses **The Internet Heroku App** as the target application, providing real-world form scenarios for testing.

## 🎯 Objectives

- Create comprehensive test coverage for form validation scenarios
- Implement Page Object Model (POM) pattern for maintainable test code
- Demonstrate different validation patterns (required fields, format validation, conditional validation)
- Test various input types and their specific behaviors
- Validate error handling and user feedback mechanisms
- Show best practices for form testing automation

## ✨ Features

### Core Features
- **Form Authentication Tests**: Complete login flow validation with success and failure scenarios
- **Multi-Field Form Validation**: Testing complex forms with multiple input types
- **Required Field Validation**: Verifying that required fields prevent form submission
- **Input Type Validation**: Testing specific HTML input types and their constraints
- **Error Message Validation**: Verifying correct error messages appear for validation failures
- **Empty Field Handling**: Testing behavior when fields are left empty
- **Checkbox Validation**: Testing conditional form submission based on agreement checkboxes

### Technical Features
- **Framework**: Playwright 1.56+
- **Language**: TypeScript 5.9+
- **Testing Type**: E2E UI Testing, Form Validation Testing
- **Browser Support**: Chromium, Firefox, WebKit (Safari)
- **Reporting**: HTML Reports with screenshots and videos
- **Pattern**: Page Object Model (POM) for maintainable code structure

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git (for cloning the repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/[username]/form-validation-playwright-e2e.git

# Navigate to project directory
cd form-validation-playwright-e2e

# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers
```

### Configuration

This project is configured to test against **The Internet Heroku App** (https://the-internet.herokuapp.com). The base URL is configured in `playwright.config.ts`:

```typescript
use: {
  baseURL: 'https://the-internet.herokuapp.com',
}
```

No additional configuration is required. The tests use publicly available test pages.

### Running Tests

```bash
# Run all tests in headless mode
npm test

# Run tests with visible browser (headed mode)
npm run test:headed

# Run tests with Playwright UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests for specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Generate and view HTML report
npm run report
```

## 📁 Project Structure

```
form-validation-playwright-e2e/
├── tests/                          # Test files
│   ├── form-authentication.spec.ts  # Login form validation tests
│   ├── form-validation.spec.ts      # Complex form validation tests
│   └── inputs-validation.spec.ts    # Input type validation tests
├── src/                             # Source code
│   └── pages/                        # Page Object Models
│       ├── FormAuthenticationPage.ts  # Login form page object
│       ├── FormPage.ts                # Complex form page object
│       └── InputsPage.ts              # Inputs page object
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
├── .gitignore                        # Git ignore file
└── README.md                         # This file
```

## 🧪 Test Scenarios

### Test Suite 1: Form Authentication Validation

**Test: Successful Login with Valid Credentials**
- Validates login with correct username and password
- Verifies successful redirect to secure area
- Confirms success message display
- Validates logout button visibility

**Test: Login Failure with Invalid Username**
- Tests login with incorrect username
- Verifies error message appears
- Confirms user remains on login page

**Test: Login Failure with Invalid Password**
- Tests login with incorrect password
- Validates error handling
- Confirms appropriate error message

**Test: Empty Username Validation**
- Attempts login with empty username field
- Verifies field validation
- Confirms error message display

**Test: Empty Password Validation**
- Attempts login with empty password field
- Validates password field validation
- Verifies error message

**Test: Both Fields Empty**
- Attempts login with both fields empty
- Validates both fields are validated
- Confirms error handling

**Test: Password Field Masking**
- Verifies password field uses type="password"
- Confirms password is masked in UI
- Validates password value is correctly stored

**Test: Complete Login and Logout Flow**
- Tests full user journey: login → verify → logout
- Validates redirects work correctly
- Confirms messages appear appropriately

**Test: Special Characters in Password**
- Tests password field with special characters
- Validates input handling
- Confirms value is stored correctly

### Test Suite 2: Complex Form Validation

**Test: Required Fields Validation**
- Verifies all required fields are marked
- Tests form submission with missing required fields
- Validates error handling for empty required fields

**Test: Complete Form Submission**
- Fills all form fields correctly
- Validates checkbox state
- Tests successful form submission

**Test: Partial Form Data**
- Tests form with incomplete data
- Validates submission is blocked
- Confirms filled fields retain values

**Test: Agreement Checkbox Requirement**
- Tests form without checking agreement checkbox
- Validates submission is blocked
- Tests checkbox state changes

**Test: Zip Code Format Validation**
- Tests numeric zip code format
- Validates format constraints
- Tests with valid numeric input

**Test: Text Input with Special Characters**
- Tests input fields with special characters
- Validates character acceptance
- Confirms value storage

**Test: Checkbox State Management**
- Tests checkbox checked/unchecked states
- Validates state changes
- Confirms form behavior with different states

**Test: Whitespace Handling**
- Tests input fields with leading/trailing spaces
- Validates whitespace preservation
- Tests trimming behavior if applicable

### Test Suite 3: Input Type Validation

**Test: Number Input Type Validation**
- Verifies number input type attribute
- Tests numeric value acceptance
- Validates decimal number handling
- Tests negative number input

**Test: Input Field Properties**
- Validates input type attributes
- Tests field visibility and enabled state
- Confirms input constraints work correctly

## 🔧 Configuration Details

### Framework Configuration

Key settings in `playwright.config.ts`:

- **Base URL**: `https://the-internet.herokuapp.com`
- **Test Directory**: `./tests`
- **Retries**: 2 retries on CI, 0 locally
- **Screenshots**: Taken on failure only
- **Videos**: Retained on failure
- **Traces**: Collected on first retry
- **Browsers**: Chromium, Firefox, WebKit (Safari)

### Test Data

Test data is defined inline in test files:

- **Valid Login Credentials**: `tomsmith` / `SuperSecretPassword!`
- **Form Data**: Defined per test scenario
- **Test Inputs**: Various test cases include edge cases and special characters

All test data uses publicly available test accounts on The Internet Heroku App.

## 📊 Test Reports

HTML reports are automatically generated after test execution:

```bash
# Run tests and generate report
npm test

# View the HTML report
npm run report
```

Reports include:
- Test execution summary
- Screenshots of failures
- Videos of failed test runs
- Execution traces
- Performance metrics

## 🎨 Best Practices Implemented

- **Page Object Model (POM)**: All page interactions are encapsulated in page object classes for maintainability and reusability
- **Descriptive Test Names**: Tests have clear, descriptive names that explain what they validate
- **Organized Test Structure**: Tests are grouped by functionality into logical test suites
- **Error Handling**: Comprehensive error validation with appropriate assertions
- **Wait Strategies**: Proper use of Playwright's auto-waiting mechanisms
- **Code Reusability**: Common actions are extracted into reusable methods
- **Type Safety**: TypeScript ensures type safety throughout the codebase
- **Clean Code**: Well-organized code with clear separation of concerns

## 🔍 Key Learnings

- **Form Validation Patterns**: Different approaches to testing various validation scenarios
- **Page Object Model Benefits**: How POM improves test maintainability and reduces duplication
- **Playwright Auto-Waiting**: Leveraging Playwright's built-in waiting mechanisms for stable tests
- **Cross-Browser Testing**: Running the same tests across different browsers with minimal configuration
- **Error Message Validation**: Strategies for validating error messages and user feedback
- **Input Type Constraints**: Understanding how HTML input types affect validation behavior

## 📸 Screenshots

Screenshots are automatically captured on test failures and included in the HTML report. The report can be viewed by running `npm run report`.

## 🚨 Troubleshooting

### Common Issues

**Issue**: Tests fail with "browser not found"
```bash
# Solution: Install Playwright browsers
npm run install:browsers
```

**Issue**: Tests timeout or are flaky
```bash
# Solution: Increase timeout in playwright.config.ts
use: {
  actionTimeout: 30000, // Increase timeout
}
```

**Issue**: Base URL connection fails
- Verify internet connection
- Check if https://the-internet.herokuapp.com is accessible
- Verify no firewall/proxy is blocking the connection

**Issue**: TypeScript compilation errors
```bash
# Solution: Verify tsconfig.json is correct
# Reinstall dependencies
npm install
```

## 📚 Technologies Used

- **Testing Framework**: Playwright 1.56.1
- **Language**: TypeScript 5.9.3
- **Node.js**: v16+ (required)
- **Build Tool**: npm
- **Reporting Tool**: Playwright HTML Reporter

## 🔗 Related Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [The Internet Heroku App](https://the-internet.herokuapp.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 📝 Notes

- This project tests against publicly available test applications
- All test credentials are publicly documented for The Internet Heroku App
- Tests are designed to be independent and can run in any order
- The project follows best practices for Playwright test automation
- All tests use Playwright's auto-waiting features for stability

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as part of the **365 Days QA Challenge**

---

⭐ If you find this project useful, please give it a star!


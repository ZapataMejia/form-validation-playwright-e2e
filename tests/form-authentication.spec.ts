import { test, expect } from '@playwright/test';
import { FormAuthenticationPage } from '../src/pages/FormAuthenticationPage';

test.describe('Form Authentication - Validation Tests', () => {
  let formAuthPage: FormAuthenticationPage;

  test.beforeEach(async ({ page }) => {
    formAuthPage = new FormAuthenticationPage(page);
    await formAuthPage.goto();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Valid credentials from The Internet Heroku App
    const validUsername = 'tomsmith';
    const validPassword = 'SuperSecretPassword!';

    await formAuthPage.login(validUsername, validPassword);
    await formAuthPage.verifyLoginSuccess();
    
    // Verify we're redirected to secure area
    await expect(page).toHaveURL(/.*\/secure.*/);
    
    // Verify logout button is visible
    await expect(page.locator('.button.secondary')).toBeVisible();
  });

  test('should fail login with invalid username', async ({ page }) => {
    const invalidUsername = 'invaliduser';
    const validPassword = 'SuperSecretPassword!';

    await formAuthPage.login(invalidUsername, validPassword);
    await formAuthPage.verifyLoginFailure();
    
    // Verify we're still on login page
    await expect(page).toHaveURL(/.*\/login.*/);
  });

  test('should fail login with invalid password', async ({ page }) => {
    const validUsername = 'tomsmith';
    const invalidPassword = 'wrongpassword';

    await formAuthPage.login(validUsername, invalidPassword);
    await formAuthPage.verifyLoginFailureInvalidPassword();
  });

  test('should fail login with empty username', async ({ page }) => {
    const emptyUsername = '';
    const validPassword = 'SuperSecretPassword!';

    await formAuthPage.fillUsername(emptyUsername);
    await formAuthPage.fillPassword(validPassword);
    await formAuthPage.clickLogin();
    
    // Verify username is empty
    await formAuthPage.verifyUsernameEmpty();
    
    // Verify error message appears
    await formAuthPage.verifyLoginFailure();
  });

  test('should fail login with empty password', async ({ page }) => {
    const validUsername = 'tomsmith';
    const emptyPassword = '';

    await formAuthPage.fillUsername(validUsername);
    await formAuthPage.fillPassword(emptyPassword);
    await formAuthPage.clickLogin();
    
    // Verify password is empty
    await formAuthPage.verifyPasswordEmpty();
    
    // Verify error message appears (could be password or username error depending on validation order)
    // The page shows "Your password is invalid!" when password is empty
    await formAuthPage.verifyLoginFailureInvalidPassword();
  });

  test('should fail login with both fields empty', async ({ page }) => {
    await formAuthPage.clickLogin();
    
    // Verify both fields are empty
    await formAuthPage.verifyUsernameEmpty();
    await formAuthPage.verifyPasswordEmpty();
    
    // Verify error message appears
    await formAuthPage.verifyLoginFailure();
  });

  test('should validate username field accepts input', async ({ page }) => {
    const testUsername = 'testuser123';
    
    await formAuthPage.fillUsername(testUsername);
    const usernameValue = await page.inputValue('#username');
    
    expect(usernameValue).toBe(testUsername);
  });

  test('should validate password field accepts input and is masked', async ({ page }) => {
    const testPassword = 'mypassword123';
    
    await formAuthPage.fillPassword(testPassword);
    
    // Verify password field has type="password" for masking
    const passwordType = await page.locator('#password').getAttribute('type');
    expect(passwordType).toBe('password');
    
    // Verify value was entered (even though masked)
    const passwordValue = await page.inputValue('#password');
    expect(passwordValue).toBe(testPassword);
  });

  test('should complete full login and logout flow', async ({ page }) => {
    const validUsername = 'tomsmith';
    const validPassword = 'SuperSecretPassword!';

    // Login
    await formAuthPage.login(validUsername, validPassword);
    await formAuthPage.verifyLoginSuccess();
    
    // Logout
    await formAuthPage.logout();
    await formAuthPage.verifyLogout();
    
    // Verify redirected back to login
    await expect(page).toHaveURL(/.*\/login.*/);
  });

  test('should handle special characters in password field', async ({ page }) => {
    const specialPassword = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    await formAuthPage.fillPassword(specialPassword);
    const passwordValue = await page.inputValue('#password');
    
    expect(passwordValue).toBe(specialPassword);
  });

  test('should handle long username input', async ({ page }) => {
    const longUsername = 'a'.repeat(100);
    
    await formAuthPage.fillUsername(longUsername);
    const usernameValue = await page.inputValue('#username');
    
    expect(usernameValue).toBe(longUsername);
  });
});


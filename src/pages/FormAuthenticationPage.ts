import { Page, expect } from '@playwright/test';

/**
 * Page Object Model for Form Authentication page
 * This class handles interactions with the login form
 */
export class FormAuthenticationPage {
  readonly page: Page;
  
  // Locators
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly loginButton = 'button[type="submit"]';
  readonly flashMessage = '#flash';
  readonly logoutButton = '.button.secondary';
  readonly successMessage = '.flash.success';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the Form Authentication page
   */
  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  /**
   * Fill username field
   */
  async fillUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await this.page.click(this.loginButton);
  }

  /**
   * Perform complete login action
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Get flash message text
   */
  async getFlashMessage(): Promise<string> {
    return await this.page.textContent(this.flashMessage) || '';
  }

  /**
   * Check if flash message contains specific text
   */
  async verifyFlashMessage(expectedText: string): Promise<void> {
    const message = await this.getFlashMessage();
    expect(message).toContain(expectedText);
  }

  /**
   * Check if login was successful by verifying success message
   */
  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page.locator(this.successMessage)).toBeVisible();
    await this.verifyFlashMessage('You logged into a secure area!');
  }

  /**
   * Check if login failed with error message
   */
  async verifyLoginFailure(expectedMessage?: string): Promise<void> {
    await expect(this.page.locator(this.flashMessage)).toBeVisible();
    const defaultMessage = 'Your username is invalid!';
    await this.verifyFlashMessage(expectedMessage || defaultMessage);
  }

  /**
   * Check if login failed due to invalid password
   */
  async verifyLoginFailureInvalidPassword(): Promise<void> {
    await expect(this.page.locator(this.flashMessage)).toBeVisible();
    await this.verifyFlashMessage('Your password is invalid!');
  }

  /**
   * Check if password field is empty
   */
  async verifyPasswordEmpty(): Promise<void> {
    const passwordValue = await this.page.inputValue(this.passwordInput);
    expect(passwordValue).toBe('');
  }

  /**
   * Check if username field is empty
   */
  async verifyUsernameEmpty(): Promise<void> {
    const usernameValue = await this.page.inputValue(this.usernameInput);
    expect(usernameValue).toBe('');
  }

  /**
   * Logout from secure area
   */
  async logout(): Promise<void> {
    await this.page.click(this.logoutButton);
  }

  /**
   * Verify logout success
   */
  async verifyLogout(): Promise<void> {
    await expect(this.page.locator(this.flashMessage)).toBeVisible();
    await this.verifyFlashMessage('You logged out of the secure area!');
  }
}


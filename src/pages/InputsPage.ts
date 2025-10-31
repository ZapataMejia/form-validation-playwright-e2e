import { Page, expect } from '@playwright/test';

/**
 * Page Object Model for Inputs page
 * This class handles interactions with different input types
 */
export class InputsPage {
  readonly page: Page;
  
  // Locators
  readonly numberInput = 'input[type="number"]';
  readonly textInput = 'input[type="text"]';
  readonly emailInput = 'input[type="email"]';
  readonly passwordInput = 'input[type="password"]';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the Inputs page (number input)
   */
  async goto(): Promise<void> {
    await this.page.goto('/inputs');
  }

  /**
   * Fill number input
   */
  async fillNumber(value: string): Promise<void> {
    await this.page.fill(this.numberInput, value);
  }

  /**
   * Verify number input only accepts numbers
   */
  async verifyNumberInputValidation(): Promise<void> {
    // Try to input non-numeric value
    await this.fillNumber('abc');
    const value = await this.page.inputValue(this.numberInput);
    // Number inputs typically don't accept non-numeric values
    expect(value).toBe('' || !isNaN(Number(value)));
  }

  /**
   * Verify input value
   */
  async verifyInputValue(selector: string, expectedValue: string): Promise<void> {
    const value = await this.page.inputValue(selector);
    expect(value).toBe(expectedValue);
  }

  /**
   * Verify input type attribute
   */
  async verifyInputType(selector: string, expectedType: string): Promise<void> {
    const inputType = await this.page.locator(selector).getAttribute('type');
    expect(inputType).toBe(expectedType);
  }
}


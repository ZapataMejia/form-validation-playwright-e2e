import { test, expect } from '@playwright/test';
import { InputsPage } from '../src/pages/InputsPage';

test.describe('Input Types Validation', () => {
  let inputsPage: InputsPage;

  test.beforeEach(async ({ page }) => {
    inputsPage = new InputsPage(page);
    await inputsPage.goto();
  });

  test('should validate number input type', async ({ page }) => {
    await inputsPage.verifyInputType('input[type="number"]', 'number');
  });

  test('should accept numeric values in number input', async ({ page }) => {
    const numericValue = '12345';
    
    await inputsPage.fillNumber(numericValue);
    await inputsPage.verifyInputValue('input[type="number"]', numericValue);
  });

  test('should validate number input field exists', async ({ page }) => {
    const numberInput = page.locator('input[type="number"]');
    await expect(numberInput).toBeVisible();
    await expect(numberInput).toBeEnabled();
  });

  test('should handle numeric input with decimals', async ({ page }) => {
    const decimalValue = '123.45';
    
    await inputsPage.fillNumber(decimalValue);
    const value = await page.inputValue('input[type="number"]');
    
    // Verify decimal value is accepted
    expect(value).toContain('123');
  });

  test('should handle negative numbers', async ({ page }) => {
    const negativeValue = '-100';
    
    await inputsPage.fillNumber(negativeValue);
    const value = await page.inputValue('input[type="number"]');
    
    expect(value).toBe(negativeValue);
  });
});


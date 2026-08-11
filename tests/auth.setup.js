import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('login and save authentication', async ({ page }) => {
  // =====================================
  // Sign in
  // =====================================

  await page.goto('https://app.optiomax.com');

  const emailInput = page
    .getByLabel(/email/i)
    .or(page.getByPlaceholder(/email/i))
    .or(page.locator('input[type="email"]'))
    .first();

  const passwordInput = page
    .getByLabel(/password/i)
    .or(page.getByPlaceholder(/password/i))
    .or(page.locator('input[type="password"]'))
    .first();

  const signInButton = page.getByRole('button', {
    name: /sign in/i,
  });

  await expect(emailInput).toBeVisible({
    timeout: 30000,
  });

  await emailInput.fill('iamtharuki@gmail.com');
  await passwordInput.fill('Tharuki@123');

  await signInButton.click();

  // =====================================
  // Verify Dashboard
  // =====================================

  await page.waitForURL('**/dashboard', {
    timeout: 60000,
  });
  
  await expect(page).toHaveURL('https://app.optiomax.com/dashboard');
  
  await page.context().storageState({
    path: authFile,
  });
});
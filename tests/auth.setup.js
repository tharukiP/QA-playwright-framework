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

  await expect(page).toHaveURL(
    /\/dashboard\/?$/
  );

  // =====================================
  // Click System Configurations
  // =====================================

  const systemConfigurationButton = page.locator(
    'a[href="/system_configurations"]'
  );

  await expect(systemConfigurationButton).toBeVisible({
    timeout: 30000,
  });

  await systemConfigurationButton.click();

  await expect(page).toHaveURL(
    /\/system_configurations\/?$/
  );

  // =====================================
  // Hover People & Access
  // =====================================

  const peopleAndAccessIcon = page
    .locator('a:has(span[title="People & Access"])')
    .first();

  await expect(peopleAndAccessIcon).toBeVisible({
    timeout: 30000,
  });

  await peopleAndAccessIcon.hover();

  // =====================================
  // Click User Roles
  // =====================================

  const userRolesLink = page.locator(
    'a[href="/user_roles"]'
  );

  await expect(userRolesLink).toBeVisible({
    timeout: 30000,
  });

  await userRolesLink.click();

  // =====================================
  // Verify User Roles page
  // =====================================

  await expect(page).toHaveURL(
    /\/user_roles\/?$/
  );

  await expect(
    page.getByRole('heading', {
      name: /User Roles/i,
    })
  ).toBeVisible({
    timeout: 30000,
  });

  // Save authenticated session
  await page.context().storageState({
    path: authFile,
  });
});
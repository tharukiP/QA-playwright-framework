import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../test-data/loginData';

test.describe('Sign In Page Tests', () => {

  test('1. Valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
      loginData.validUser.email,
      loginData.validUser.password
    );

    await page.waitForTimeout(3000);

    await expect(page).not.toHaveURL('https://app.optiomax.com/');
  });

  test('2. Invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
      loginData.invalidPasswordUser.email,
      loginData.invalidPasswordUser.password
    );

    await expect(page).toHaveURL('https://app.optiomax.com/');
  });

  test('3. Invalid email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
      loginData.invalidEmailUser.email,
      loginData.invalidEmailUser.password
    );

    await expect(page).toHaveURL('https://app.optiomax.com/');
  });

  test('4. Empty email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.enterPassword(loginData.validUser.password);
    await loginPage.clickSignIn();

    await expect(loginPage.emailInput).toBeVisible();
  });

  test('5. Empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.enterEmail(loginData.validUser.email);
    await loginPage.clickSignIn();

    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('6. Both fields empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.clickSignIn();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('7. Sign In button disabled when empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await expect(loginPage.signInButton).toBeEnabled();
    
  });

});

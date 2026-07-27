import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { UserAccountsPage } from '../../pages/UserAccountsPage';
import { loginData } from '../../test-data/loginData';

test('Navigate to User Accounts page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const userAccountsPage = new UserAccountsPage(page);

  // Open Sign In page
  await loginPage.open();

  // Sign in with valid credentials
  await loginPage.login(
    loginData.validUser.email,
    loginData.validUser.password
  );

  // Verify Dashboard page
  await expect(page).toHaveURL(
    'https://app.optiomax.com/dashboard'
  );

  // Navigate to User Accounts page
  await userAccountsPage.navigateToUserAccounts();
});
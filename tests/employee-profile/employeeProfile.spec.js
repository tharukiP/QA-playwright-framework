import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeProfilePage } from '../../pages/EmployeeProfilePage';
import { loginData } from '../../test-data/loginData';

test('Navigate to Employee Profile page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const employeeProfilePage = new EmployeeProfilePage(page);

  await loginPage.open();

  await loginPage.login(
    loginData.validUser.email,
    loginData.validUser.password
  );

  await employeeProfilePage.navigateToEmployeeProfile();
});
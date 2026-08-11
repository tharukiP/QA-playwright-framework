import { test, expect } from '@playwright/test';
import DesignationPage from '../../pages/DesignationPage';

test.describe('Designation Page Navigation', () => {

  test.use({
    storageState: 'playwright/.auth/user.json'
  });

  test('Navigate to Designation page', async ({ page }) => {

    const designationPage = new DesignationPage(page);

    // Open dashboard using saved authentication
    await page.goto('https://app.optiomax.com/dashboard');

    await expect(page).toHaveURL(/dashboard/, {
      timeout: 30000
    });

    // Navigate to System Configuration
    await designationPage.navigateToSystemConfiguration();

    // Hover on second sidebar icon - Organization
    await designationPage.hoverOrganization();

    // Click Designation
    await designationPage.clickDesignation();

    // Verify Designation URL
    await designationPage.verifyDesignationPage();
  });

});
import { test, expect } from '@playwright/test';
import OrganizationPage from '../../pages/OrganizationPage.js';
import organizationData from '../../test-data/organizationData.js';

test.describe('Build Organization', () => {
  let organizationPage;

  test.beforeEach(async ({ page }) => {
    organizationPage = new OrganizationPage(page);

    await page.goto('https://app.optiomax.com/dashboard');

    await expect(page).toHaveURL(
      'https://app.optiomax.com/dashboard'
    );
  });

  test('Should create an Organization with a randomly selected Organization Head', async () => {
    // Navigate to Build Organization page
    await organizationPage.navigateToBuildOrganization();

    // Open Add Organization Entity drawer
    await organizationPage.openAddOrganizationDrawer();

    // Fill Organization Name and Description
    await organizationPage.fillOrganizationDetails(
      organizationData.addOrganization.name,
      organizationData.addOrganization.description
    );

    // Open Organization Head Selection
    await organizationPage.openOrganizationHeadSelection();

    // Randomly select an employee
    await organizationPage.selectRandomOrganizationHead();

    // Save selected Organization Head
    await organizationPage.saveSelectionButton.click();

    // Verify Organization Head Selection drawer is closed
    await expect(
      organizationPage.organizationHeadSelectionTitle
    ).not.toBeVisible();

    // Fill Contact Information
    await organizationPage.fillContactInformation(
      organizationData.contactInformation.telephone,
      organizationData.contactInformation.address,
      organizationData.contactInformation.email,
      organizationData.contactInformation.website
    );

    // Create Organization
    await organizationPage.createOrganization();

    // Verify newly created Organization is displayed
    await organizationPage.verifyOrganizationCreated(
      organizationData.addOrganization.name
    );
  });
});
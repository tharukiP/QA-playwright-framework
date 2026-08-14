import { test, expect } from '@playwright/test';
import DesignationPage from '../../pages/DesignationPage';
import designationData from '../../test-data/designationData';

test.describe.serial('Designation Page', () => {
  test.use({
    storageState: 'playwright/.auth/user.json',
  });

  let firstTest = true;

  // =====================================
  // Navigation
  // First test: Dashboard → System Configuration
  // → Organization → Designation
  // Remaining tests: Directly open Designation page
  // =====================================

  test.beforeEach(async ({ page }) => {
    const designationPage = new DesignationPage(page);

    if (firstTest) {
      // First time only
      await page.goto('https://app.optiomax.com/dashboard');

      await expect(page).toHaveURL(/dashboard/, {
        timeout: 30000,
      });

      await designationPage.navigateToDesignation();

      firstTest = false;
    } else {
      // From second test onwards
      await page.goto('https://app.optiomax.com/designation');

      await page.waitForLoadState('networkidle');
    }

    await designationPage.verifyDesignationPage();
  });

  // =====================================
  // DES-001
  // Open Add New Designation drawer
  // =====================================

  test('DES-001 - Open Add New Designation drawer', async ({ page }) => {
    const designationPage = new DesignationPage(page);

    await designationPage.openAddDesignationDrawer();

    await expect(designationPage.nameInput).toBeVisible();
    await expect(designationPage.descriptionInput).toBeVisible();

    await designationPage.closeDrawer();
  });

  // =====================================
  // DES-006
  // Name required validation
  // =====================================

  test('DES-006 - Name required validation', async ({ page }) => {
    const designationPage = new DesignationPage(page);

    await designationPage.openAddDesignationDrawer();

    await designationPage.descriptionInput.fill(
      'Designation description without name.'
    );

    await designationPage.createDesignation();

    await expect(
      page.getByText(/name.*required|name.*mandatory/i)
    ).toBeVisible({
      timeout: 10000,
    });

    await designationPage.closeDrawer();
  });

  // =====================================
  // DES-007
  // Description required validation
  // =====================================

  test(
    'DES-007 - Description required validation',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.openAddDesignationDrawer();

      await designationPage.nameInput.fill(
        'Designation Without Description'
      );

      await designationPage.createDesignation();

      await expect(
        page.getByText(
          /description.*required|description.*mandatory/i
        )
      ).toBeVisible({
        timeout: 10000,
      });

      await designationPage.closeDrawer();
    }
  );

  // =====================================
  // DES-009
  // Duplicate designation validation
  // =====================================

  test(
    'DES-009 - Duplicate designation validation',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.openAddDesignationDrawer();

      await designationPage.fillDesignationForm(
        designationData.duplicateDesignation.existingName,
        designationData.duplicateDesignation.description
      );

      await designationPage.createDesignation();

      await expect(
        page.getByText(
          /already exists|duplicate|already.*designation/i
        )
      ).toBeVisible({
        timeout: 10000,
      });

      await designationPage.closeDrawer();
    }
  );

  // =====================================
  // DES-003
  // Create designation successfully
  // =====================================

  test(
    'DES-003 - Create designation successfully',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.openAddDesignationDrawer();

      await designationPage.fillDesignationForm(
        designationData.addDesignation.validName,
        designationData.addDesignation.validDescription
      );

      await designationPage.createDesignation();

      await designationPage.verifyDesignationExists(
        designationData.addDesignation.validName
      );
    }
  );

  // =====================================
  // DES-015
  // Open Edit drawer
  // =====================================

  test('DES-015 - Open Edit designation drawer', async ({ page }) => {
    const designationPage = new DesignationPage(page);

    await designationPage.clickEditDesignation();

    await expect(designationPage.nameInput).toBeVisible();
    await expect(designationPage.descriptionInput).toBeVisible();

    await designationPage.closeDrawer();
  });

  // =====================================
  // DES-016
  // Close Edit drawer without updating
  // =====================================

  test(
    'DES-016 - Close Edit drawer without updating',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.clickEditDesignation();

      await designationPage.nameInput.fill(
        'Temporary Changed Name'
      );

      await designationPage.descriptionInput.fill(
        'Temporary changed description.'
      );

      await designationPage.closeDrawer();
    }
  );

  // =====================================
  // DES-017
  // Update designation name only
  // =====================================

  test('DES-017 - Update designation name only', async ({ page }) => {
    const designationPage = new DesignationPage(page);
  
    // Open Automation Test Manager
    await designationPage.clickEditDesignation(
      designationData.addDesignation.validName
    );
  
    // Update the name
    await designationPage.updateDesignationNameOnly(
      designationData.editDesignation.nameOnlyUpdatedName
    );
  
    // Verify updated name
    await designationPage.verifyDesignationExists(
      designationData.editDesignation.nameOnlyUpdatedName
    );
  });

  // =====================================
  // DES-018
  // Update designation description only
  // =====================================

  test(
    'DES-018 - Update designation description only',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      // Open the designation currently being edited
      await designationPage.clickEditDesignation();

      await designationPage.updateDesignationDescriptionOnly(
        designationData.editDesignation
          .descriptionOnlyUpdatedDescription
      );

      await designationPage.verifyDesignationExists(
        designationData.editDesignation.nameOnlyUpdatedName
      );
    }
  );

  // =====================================
  // DES-019
  // Update both name and description
  // =====================================

  test(
    'DES-019 - Update both designation name and description',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.clickEditDesignation();

      await designationPage.updateDesignation(
        designationData.editDesignation.finalUpdatedName,
        designationData.editDesignation.finalUpdatedDescription
      );

      await designationPage.verifyDesignationExists(
        designationData.editDesignation.finalUpdatedName
      );
    }
  );

  // =====================================
  // DES-020
  // Verify updated data is displayed
  // =====================================

  test(
    'DES-020 - Verify updated designation data is displayed',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.verifyDesignationExists(
        designationData.editDesignation.finalUpdatedName
      );
    }
  );

  // =====================================
  // DES-021
  // Duplicate name during edit
  // =====================================

  test(
    'DES-021 - Duplicate designation name during edit',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.clickEditDesignation();

      await designationPage.nameInput.fill(
        designationData.duplicateDesignation.existingName
      );

      await designationPage.updateButton.click();

      await expect(
        page.getByText(
          /already exists|duplicate|already.*designation/i
        )
      ).toBeVisible({
        timeout: 10000,
      });

      await designationPage.closeDrawer();
    }
  );

  // =====================================
  // DES-024
  // Open Delete popup
  // =====================================

  test('DES-024 - Open Delete popup', async ({ page }) => {
    const designationPage = new DesignationPage(page);

    await designationPage.clickDeleteDesignation();

    await expect(
      designationPage.deleteConfirmationInput
    ).toBeVisible();

    await expect(
      designationPage.deleteDesignationButton
    ).toBeVisible();

    await designationPage.cancelDelete();
  });

  // =====================================
  // DES-026
  // Delete button disabled initially
  // =====================================

  test(
    'DES-026 - Delete button disabled initially',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.clickDeleteDesignation();

      await designationPage.verifyDeleteButtonDisabled();

      await designationPage.cancelDelete();
    }
  );

  // =====================================
  // DES-028
  // Delete with incorrect designation name
  // =====================================

  test(
    'DES-028 - Delete with incorrect designation name',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.clickDeleteDesignation();

      await designationPage.enterDeleteConfirmationName(
        designationData.deleteDesignation.incorrectName
      );

      await designationPage.verifyDeleteButtonDisabled();

      await designationPage.cancelDelete();
    }
  );

  // =====================================
  // DES-034
  // Cancel delete and clear popup
  // =====================================

  test(
    'DES-034 - Cancel delete and clear popup',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.clickDeleteDesignation();

      await designationPage.enterDeleteConfirmationName(
        designationData.deleteDesignation.partialName
      );

      await designationPage.clearDeleteConfirmation();

      await expect(
        designationPage.deleteConfirmationInput
      ).toHaveValue('');

      await designationPage.cancelDelete();

      await expect(
        designationPage.deleteConfirmationInput
      ).not.toBeVisible();
    }
  );

  // =====================================
  // DES-027
  // Delete with correct designation name
  // =====================================

  test(
    'DES-027 - Delete with correct designation name',
    async ({ page }) => {
      const designationPage = new DesignationPage(page);

      await designationPage.clickDeleteDesignation();

      await designationPage.enterDeleteConfirmationName(
        designationData.editDesignation.finalUpdatedName
      );

      await designationPage.verifyDeleteButtonEnabled();

      await designationPage.confirmDeleteDesignation();

      await expect(
        page.getByText(
          designationData.editDesignation.finalUpdatedName,
          { exact: true }
        )
      ).not.toBeVisible({
        timeout: 15000,
      });
    }
  );

  // =====================================
  // DES-036
  // Verify designation is deleted
  // =====================================

  test(
    'DES-036 - Verify designation is deleted',
    async ({ page }) => {
      await expect(
        page.getByText(
          designationData.editDesignation.finalUpdatedName,
          { exact: true }
        )
      ).not.toBeVisible({
        timeout: 15000,
      });
    }
  );
});
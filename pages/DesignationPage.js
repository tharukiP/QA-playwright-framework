import { expect } from '@playwright/test';

class DesignationPage {
  constructor(page) {
    this.page = page;

    // =====================================
    // Navigation
    // =====================================

    this.systemConfigurationButton = page.locator(
      'a[href="/system_configurations"]'
    );

    this.organizationIcon = page
      .locator('a:has(span[title="Organization"])')
      .first();

    this.designationMenu = page.locator('a[href="/designation"]');

    // =====================================
    // Designation Page
    // =====================================

    this.addNewDesignationButton = page.getByRole('button', {
      name: /Add New Designation/i,
    });

    // =====================================
    // Add / Edit Drawer
    // =====================================

    this.nameInput = page.locator('#name');

    this.descriptionInput = page.locator(
      'textarea[name="designation_description"]'
    );

    this.createButton = page.getByRole('button', {
      name: /^Create$/i,
    });

    this.updateButton = page.getByRole('button', {
      name: /^Update$/i,
    });

    this.closeDrawerButton = page.locator(
      'button[aria-controls="drawer-right-example"]'
    );

    // =====================================
    // Delete Popup
    // =====================================

    this.deleteConfirmationInput = page.locator(
      'input[placeholder="Type designation name"]'
    );

    this.deleteDesignationButton = page.getByRole('button', {
      name: 'Delete Designation',
      exact: true,
    });

    this.cancelButton = page.getByRole('button', {
      name: 'Cancel',
      exact: true,
    });
  }

  // =====================================
  // Navigate to System Configuration
  // =====================================

  async navigateToSystemConfiguration() {
    await this.systemConfigurationButton.waitFor({
      state: 'visible',
      timeout: 30000,
    });

    await this.systemConfigurationButton.click();

    await this.page.waitForLoadState('networkidle');

    await this.page.waitForURL(
      'https://app.optiomax.com/system_configurations',
      {
        timeout: 30000,
      }
    );
  }

  // =====================================
  // Hover Organization
  // =====================================

  async hoverOrganization() {
    await this.organizationIcon.waitFor({
      state: 'visible',
      timeout: 30000,
    });

    await this.organizationIcon.hover();

    await this.designationMenu.waitFor({
      state: 'visible',
      timeout: 10000,
    });
  }

  // =====================================
  // Click Designation
  // =====================================

  async clickDesignation() {
    await this.designationMenu.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.designationMenu.click();

    await this.page.waitForLoadState('networkidle');

    await this.page.waitForURL(
      'https://app.optiomax.com/designation',
      {
        timeout: 30000,
      }
    );
  }

  // =====================================
  // Complete Navigation
  // =====================================

  async navigateToDesignation() {
    await this.navigateToSystemConfiguration();
    await this.hoverOrganization();
    await this.clickDesignation();
  }

  // =====================================
  // Verify Designation Page
  // =====================================

  async verifyDesignationPage() {
    await expect(this.page).toHaveURL(
      'https://app.optiomax.com/designation',
      {
        timeout: 30000,
      }
    );
  }

  // =====================================
  // Open Add Designation Drawer
  // =====================================

  async openAddDesignationDrawer() {
    await this.addNewDesignationButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.addNewDesignationButton.click();

    await expect(this.nameInput).toBeVisible({
      timeout: 10000,
    });

    await expect(this.descriptionInput).toBeVisible({
      timeout: 10000,
    });
  }

  // =====================================
  // Close Add / Update Drawer
  // =====================================

  async closeDrawer() {
    await this.closeDrawerButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.closeDrawerButton.click();

    await expect(this.nameInput).not.toBeVisible({
      timeout: 10000,
    });
  }

  // =====================================
  // Fill Designation Form
  // =====================================

  async fillDesignationForm(name, description) {
    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);
  }

  // =====================================
  // Create Designation
  // =====================================

  async createDesignation() {
    await this.createButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.createButton.click();
  }

  // =====================================
  // Verify Designation Exists
  // =====================================

  async verifyDesignationExists(name) {
    await expect(
      this.page.getByText(name, { exact: true }).first()
    ).toBeVisible({
      timeout: 15000,
    });
  }

  // =====================================
  // Find Automation Test Manager
  // =====================================

  async getAutomationTestManagerText() {
    const designationName = this.page.getByText(
      'Automation Test Manager',
      {
        exact: true,
      }
    );

    await expect(designationName).toBeVisible({
      timeout: 15000,
    });

    return designationName;
  }

  // =====================================
  // Click Edit Icon for Automation Test Manager
  // =====================================

  async clickEditDesignation() {
    const designationName = await this.getAutomationTestManagerText();

    // Find parent designation card
    const designationCard = designationName.locator(
      'xpath=ancestor::div[contains(@class, "group")][1]'
    );

    await expect(designationCard).toBeVisible({
      timeout: 10000,
    });

    // First button = Edit button
    const editButton = designationCard.locator('button').first();

    await expect(editButton).toBeVisible({
      timeout: 10000,
    });

    await editButton.click();

    // Verify Edit drawer opened
    await expect(this.nameInput).toBeVisible({
      timeout: 10000,
    });

    await expect(this.descriptionInput).toBeVisible({
      timeout: 10000,
    });
  }

  // =====================================
  // Update Name Only
  // =====================================

  async updateDesignationNameOnly(name) {
    await this.nameInput.fill(name);

    await this.updateButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.updateButton.click();
  }

  // =====================================
  // Update Description Only
  // =====================================

  async updateDesignationDescriptionOnly(description) {
    await this.descriptionInput.fill(description);

    await this.updateButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.updateButton.click();
  }

  // =====================================
  // Update Both Name and Description
  // =====================================

  async updateDesignation(name, description) {
    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);

    await this.updateButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.updateButton.click();
  }

  // =====================================
  // Click Delete Icon for Automation Test Manager
  // =====================================

  async clickDeleteDesignation() {
    const designationName = await this.getAutomationTestManagerText();

    // Find parent designation card
    const designationCard = designationName.locator(
      'xpath=ancestor::div[contains(@class, "group")][1]'
    );

    await expect(designationCard).toBeVisible({
      timeout: 10000,
    });

    // Second button = Delete button
    const deleteButton = designationCard.locator('button').nth(1);

    await expect(deleteButton).toBeVisible({
      timeout: 10000,
    });

    await deleteButton.click();

    await expect(this.deleteConfirmationInput).toBeVisible({
      timeout: 10000,
    });
  }

  // =====================================
  // Enter Delete Confirmation Name
  // =====================================

  async enterDeleteConfirmationName(name) {
    await this.deleteConfirmationInput.fill(name);
  }

  // =====================================
  // Verify Delete Button Enabled
  // =====================================

  async verifyDeleteButtonEnabled() {
    await expect(this.deleteDesignationButton).toBeEnabled({
      timeout: 10000,
    });
  }

  // =====================================
  // Verify Delete Button Disabled
  // =====================================

  async verifyDeleteButtonDisabled() {
    await expect(this.deleteDesignationButton).toBeDisabled({
      timeout: 10000,
    });
  }

  // =====================================
  // Confirm Delete
  // =====================================

  async confirmDeleteDesignation() {
    await this.deleteDesignationButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.deleteDesignationButton.click();
  }

  // =====================================
  // Cancel Delete
  // =====================================

  async cancelDelete() {
    await this.cancelButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    await this.cancelButton.click();

    await expect(this.deleteConfirmationInput).not.toBeVisible({
      timeout: 10000,
    });
  }

  // =====================================
  // Clear Delete Confirmation
  // =====================================

  async clearDeleteConfirmation() {
    await this.deleteConfirmationInput.fill('');
  }
}

export default DesignationPage;
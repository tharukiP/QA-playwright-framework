import { expect } from '@playwright/test';

class OrganizationPage {
  constructor(page) {
    this.page = page;

    // =====================================
    // Navigation Locators
    // =====================================

// Contact Information
// =====================================
// Contact Information Locators
// =====================================

this.telephoneNumberInput = page.locator(
  'input[name="telephoneNumber"]'
);

this.addressInput = page.locator(
  'input[name="address"]'
);

this.emailInput = page.locator(
  'input[name="email"]'
);

this.websiteInput = page.locator(
  'input[name="website"]'
);

    // Newly created organization
this.organizationCard = (organizationName) =>
  page.getByText(organizationName, { exact: true });

    this.systemConfigurationButton = page.locator(
      'a[href="/system_configurations"]'
    );

    this.organizationMenu = page.locator(
      'a:has(span[title="Organization"])'
    );

    this.buildOrganizationMenu = page.getByText(
      'Build Organization',
      { exact: true }
    );

    // =====================================
    // Add Organization Entity Locators
    // =====================================

    this.addOrganizationButton = page
      .locator('button:has(svg.lucide-plus)')
      .first();

    this.addOrganizationDrawerTitle = page.locator(
      'h5[title="Add organization entity"]'
    );

    // Name
    this.organizationNameInput = page.locator(
      'input[name="organizationName"]'
    );

    // Description
    this.organizationDescriptionInput = page.locator(
      'textarea[name="organizationDescription"]'
    );

    // =====================================
    // Organization Head Selection Locators
    // =====================================

    // Add Head button
    this.addHeadButton = page.getByRole('button', {
      name: 'Add head',
    });

    // Organization Head Selection drawer/modal title
    this.organizationHeadSelectionTitle = page.getByText(
      'Organization Head Selection',
      { exact: true }
    );

    // Employee selection radio buttons
    this.employeeRadioButtons = page.locator(
      'input[type="radio"]'
    );

    // Save Selection button
    this.saveSelectionButton = page.getByRole('button', {
      name: 'Save Selection',
    });

    // Create button
    this.createButton = page.getByRole('button', {
      name: 'Create',
      exact: true,
    });
  }

  // =====================================
  // Navigate to Build Organization
  // =====================================

// =====================================
// Navigate to Build Organization
// =====================================

async navigateToBuildOrganization() {
  // Wait for System Configuration button
  await expect(this.systemConfigurationButton).toBeVisible({
    timeout: 10000,
  });

  // Click System Configuration
  await this.systemConfigurationButton.click();

  // Wait for navigation
  await this.page.waitForURL('https://app.optiomax.com/system_configurations', {
    timeout: 10000,
  });

  // Verify URL
  await expect(this.page).toHaveURL('https://app.optiomax.com/system_configurations');

  // Hover Organization menu
  await this.organizationMenu.hover();

  // Wait for Build Organization menu
  await expect(this.buildOrganizationMenu).toBeVisible({
    timeout: 10000,
  });

  // Click Build Organization
  await this.buildOrganizationMenu.click();

  // Wait for navigation
  await this.page.waitForURL('https://app.optiomax.com/build_organization', {
    timeout: 10000,
  });

  // Verify URL
  await expect(this.page).toHaveURL('https://app.optiomax.com/build_organization');
}


  // =====================================
  // Open Add Organization Entity Drawer
  // =====================================

  async openAddOrganizationDrawer() {
    await expect(this.addOrganizationButton).toBeVisible();

    await this.addOrganizationButton.click();

    await expect(this.addOrganizationDrawerTitle).toBeVisible({
      timeout: 10000,
    });
  }

  // =====================================
  // Fill Organization Details
  // =====================================

  async fillOrganizationDetails(name, description) {
    await this.organizationNameInput.fill(name);
    await this.organizationDescriptionInput.fill(description);
  }

// Fill Contact Information
// =====================================

async fillContactInformation(telephone, address, email, website) {
  await this.telephoneNumberInput.fill(telephone);
  await this.addressInput.fill(address);
  await this.emailInput.fill(email);
  await this.websiteInput.fill(website);
} 

  // =====================================
  // Open Organization Head Selection
  // =====================================

  async openOrganizationHeadSelection() {
    await expect(this.addHeadButton).toBeVisible();

    await this.addHeadButton.click();

    await expect(
      this.organizationHeadSelectionTitle
    ).toBeVisible({
      timeout: 10000,
    });
  }

  // =====================================
  // Select Random Organization Head
  async selectRandomOrganizationHead() {
    // Wait until at least one employee is available
    await expect(
      this.employeeRadioButtons.first()
    ).toBeVisible({ timeout: 10000 });
  
    // Get employee count
    const employeeCount =
      await this.employeeRadioButtons.count();
  
    console.log(`Available employees: ${employeeCount}`);
  
    // Generate random employee index
    const randomIndex = Math.floor(
      Math.random() * employeeCount
    );
  
    console.log(
      `Selected random employee index: ${randomIndex}`
    );
  
    // Select random employee
    const selectedEmployee =
      this.employeeRadioButtons.nth(randomIndex);
  
    await selectedEmployee.check();
  
    // Verify selected
    await expect(selectedEmployee).toBeChecked();
  }
  // =====================================
  // Create Organization
  // =====================================

 // =====================================
// Create Organization
// =====================================

async createOrganization() {
  // Verify Create button is enabled
  await expect(this.createButton).toBeEnabled();

  // Click Create
  await this.createButton.click();

  // Verify Add Organization drawer is closed
  await expect(this.addOrganizationDrawerTitle).not.toBeVisible({
    timeout: 10000,
  });
}


// =====================================
// Verify Created Organization
// =====================================

async verifyOrganizationCreated(organizationName) {
  await expect(
    this.organizationCard(organizationName)
  ).toBeVisible({
    timeout: 10000,
  });
}
}
export default OrganizationPage;  
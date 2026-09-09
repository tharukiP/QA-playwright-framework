import { expect } from '@playwright/test';

class OrganizationPage {

  constructor(page) {

    this.page = page;


    // =====================================
    // Navigation Locators
    // =====================================

    this.systemConfigurationButton = page.locator(
      'a[href="/system_configurations"]'
    );

    this.organizationMenu = page.locator(
      'a:has(span[title="Organization"])'
    );

    this.buildOrganizationMenu = page.locator(
      'a[href="/build_organization"]'
    );


    // =====================================
    // Build Organization Page
    // =====================================

    this.buildOrganizationHeading = page.getByText(
      'Build Organization',
      {
        exact: true,
      }
    );


    // =====================================
    // Add Organization Entity
    // =====================================

    this.addOrganizationButton = page
      .locator('button:has(svg.lucide-plus)')
      .first();

    this.addOrganizationDrawerTitle = page.locator(
      'h5[title="Add organization entity"]'
    );


    // =====================================
    // Organization Details
    // =====================================

    this.organizationNameInput = page.locator(
      'input[name="organizationName"]'
    );

    this.organizationDescriptionInput = page.locator(
      'textarea[name="organizationDescription"]'
    );


    // =====================================
    // Organization Detail Labels
    // =====================================

    this.organizationNameLabel = page.locator(
      'label[for="organizationName"]'
    );

    this.organizationDescriptionLabel = page.locator(
      'label[for="organizationDescription"]'
    );


    // =====================================
    // Contact Information
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


    // =====================================
    // Organization Head Selection
    // =====================================

    this.addHeadButton = page.getByRole(
      'button',
      {
        name: 'Add head',
        exact: true,
      }
    );

    this.organizationHeadSelectionTitle =
      page.getByText(
        'Organization Head Selection',
        {
          exact: true,
        }
      );

    this.employeeRadioButtons = page.locator(
      'input[type="radio"]'
    );

    this.saveSelectionButton = page.getByRole(
      'button',
      {
        name: /Save Selection/,
      }
    );

    this.resetSelectionButton = page.getByRole(
      'button',
      {
        name: 'Reset',
        exact: true,
      }
    );


    // =====================================
    // Create Button
    // =====================================

    this.createButton = page.getByRole(
      'button',
      {
        name: 'Create',
        exact: true,
      }
    );


    // =====================================
    // Organization Cards
    // =====================================

    this.organizationCards = page.locator(
      'div:has(button:has(svg.lucide-trash-2))'
    );


    // =====================================
    // Remove Organization Popup
    // =====================================

    this.removeOrganizationTitle = page.getByText(
      'Remove organization',
      {
        exact: true,
      }
    );

    this.removeOrganizationNameInput = page.locator(
      'input#name'
    );

    this.removeOrganizationCancelButton =
      page.getByRole(
        'button',
        {
          name: 'Cancel',
          exact: true,
        }
      );

    this.removeOrganizationConfirmButton =
      page.getByRole(
        'button',
        {
          name: 'Confirm',
          exact: true,
        }
      );

    this.removeOrganizationCloseButton =
      page.locator(
        'button:has(svg.lucide-x)'
      );

  }


  // =====================================
  // Navigate to Build Organization
  // =====================================

  async navigateToBuildOrganization() {

    await expect(
      this.systemConfigurationButton
    ).toBeVisible({
      timeout: 10000,
    });

    await this.systemConfigurationButton.click();

    await this.page.waitForURL(
      'https://app.optiomax.com/system_configurations',
      {
        timeout: 10000,
      }
    );

    await expect(
      this.page
    ).toHaveURL(
      'https://app.optiomax.com/system_configurations'
    );


    await this.organizationMenu.hover();

    await expect(
      this.buildOrganizationMenu
    ).toBeVisible({
      timeout: 10000,
    });


    await this.buildOrganizationMenu.click();

    await this.page.waitForURL(
      'https://app.optiomax.com/build_organization',
      {
        timeout: 10000,
      }
    );

    await expect(
      this.page
    ).toHaveURL(
      'https://app.optiomax.com/build_organization'
    );

  }


  // =====================================
  // Verify Build Organization Page
  // =====================================

  async verifyBuildOrganizationPage() {

    await expect(
      this.page
    ).toHaveURL(
      'https://app.optiomax.com/build_organization'
    );

    await expect(
      this.buildOrganizationHeading
    ).toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Add Organization Button
  // =====================================

  async verifyAddOrganizationButton() {

    await expect(
      this.addOrganizationButton
    ).toBeVisible({
      timeout: 10000,
    });

    await expect(
      this.addOrganizationButton
    ).toBeEnabled({
      timeout: 10000,
    });

  }


  // =====================================
  // Open Add Organization Drawer
  // =====================================

  async openAddOrganizationDrawer() {

    await expect(
      this.addOrganizationButton
    ).toBeVisible({
      timeout: 10000,
    });

    await expect(
      this.addOrganizationButton
    ).toBeEnabled({
      timeout: 10000,
    });

    await this.addOrganizationButton.click();

    await expect(
      this.addOrganizationDrawerTitle
    ).toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Add Organization Drawer
  // =====================================

  async verifyAddOrganizationDrawer() {

    await expect(
      this.addOrganizationDrawerTitle
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.organizationNameInput
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.organizationDescriptionInput
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.telephoneNumberInput
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.addressInput
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.emailInput
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.websiteInput
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.addHeadButton
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.createButton
    ).toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Organization Name Required
  // =====================================

  async verifyOrganizationNameRequired() {

    await expect(
      this.organizationNameLabel
    ).toBeVisible({
      timeout: 10000,
    });


    const requiredIndicator =
      this.organizationNameLabel.locator(
        'span.text-red-500'
      );


    await expect(
      requiredIndicator
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      requiredIndicator
    ).toHaveText('*');

  }


  // =====================================
  // Verify Description Required
  // =====================================

  async verifyOrganizationDescriptionRequired() {

    await expect(
      this.organizationDescriptionLabel
    ).toBeVisible({
      timeout: 10000,
    });


    const requiredIndicator =
      this.organizationDescriptionLabel.locator(
        'span.text-red-500'
      );


    await expect(
      requiredIndicator
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      requiredIndicator
    ).toHaveText('*');

  }


  // =====================================
  // Verify Optional Organization Fields
  // =====================================

  async verifyOptionalOrganizationFields() {

    const telephoneLabel =
      this.page.getByText(
        'Telephone number',
        {
          exact: true,
        }
      );

    const addressLabel =
      this.page.getByText(
        'Address',
        {
          exact: true,
        }
      );

    const emailLabel =
      this.page.getByText(
        'Email',
        {
          exact: true,
        }
      );

    const websiteLabel =
      this.page.getByText(
        'Website',
        {
          exact: true,
        }
      );


    await expect(
      telephoneLabel
    ).toBeVisible({
      timeout: 10000,
    });

    await expect(
      addressLabel
    ).toBeVisible({
      timeout: 10000,
    });

    await expect(
      emailLabel
    ).toBeVisible({
      timeout: 10000,
    });

    await expect(
      websiteLabel
    ).toBeVisible({
      timeout: 10000,
    });


    // =====================================
    // Verify optional fields do not have *
    // =====================================

    await expect(
      telephoneLabel
    ).not.toContainText('*');

    await expect(
      addressLabel
    ).not.toContainText('*');

    await expect(
      emailLabel
    ).not.toContainText('*');

    await expect(
      websiteLabel
    ).not.toContainText('*');

  }


  // =====================================
  // Fill Organization Details
  // =====================================

  async fillOrganizationDetails(
    name,
    description
  ) {

    await expect(
      this.organizationNameInput
    ).toBeVisible({
      timeout: 10000,
    });


    await this.organizationNameInput.fill(
      name
    );


    await expect(
      this.organizationDescriptionInput
    ).toBeVisible({
      timeout: 10000,
    });


    await this.organizationDescriptionInput.fill(
      description
    );

  }


  // =====================================
  // Fill Contact Information
  // =====================================

  async fillContactInformation(
    telephone,
    address,
    email,
    website
  ) {

    await this.telephoneNumberInput.fill(
      telephone
    );

    await this.addressInput.fill(
      address
    );

    await this.emailInput.fill(
      email
    );

    await this.websiteInput.fill(
      website
    );

  }


  // =====================================
  // Verify Organization Head Section
  // =====================================

  async verifyOrganizationHeadSection() {

    const organizationHeadLabel =
      this.page.getByText(
        'Organization Head',
        {
          exact: false,
        }
      ).first();


    await expect(
      organizationHeadLabel
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.addHeadButton
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.addHeadButton
    ).toBeEnabled({
      timeout: 10000,
    });

  }


  // =====================================
  // Open Organization Head Selection
  // =====================================

  async openOrganizationHeadSelection() {

    await expect(
      this.addHeadButton
    ).toBeVisible({
      timeout: 10000,
    });


    await this.addHeadButton.click();


    await expect(
      this.organizationHeadSelectionTitle
    ).toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Organization Head Selection Popup
  // =====================================

  async verifyOrganizationHeadSelectionPopup() {

    await expect(
      this.organizationHeadSelectionTitle
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.employeeRadioButtons.first()
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.saveSelectionButton
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.resetSelectionButton
    ).toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Select Organization Head
  // =====================================

  async selectOrganizationHead() {

// =====================================
  // Wait for Organization Head Selection
  // =====================================

  await expect(
    this.organizationHeadSelectionTitle
  ).toBeVisible({
    timeout: 10000,
  });

  // =====================================
  // Wait for at least one employee
  // =====================================

  await expect(
    this.employeeRadioButtons.first()
  ).toBeVisible({
    timeout: 10000,
  });

  // =====================================
  // Select first available employee
  // =====================================

  const selectedEmployee =
    this.employeeRadioButtons.first();

  await selectedEmployee.check();

  console.log(
    'Organization head selected successfully.'
  );

    // =====================================
    // Get selected employee information
    // =====================================

    const employeeRow =
      selectedEmployee.locator(
        'xpath=..'
      );


    const employeeText =
      (
        await employeeRow.innerText()
      ).trim();


    const employeeName =
      employeeText
        .split('\n')[0]
        .trim();


    console.log(
      `Selected organization head: ${employeeName}`
    );


    return employeeName;

  }


  // =====================================
  // Save Organization Head Selection
  // =====================================

  async saveOrganizationHeadSelection() {

    await expect(
      this.saveSelectionButton
    ).toBeEnabled({
      timeout: 10000,
    });


    await this.saveSelectionButton.click();


    // =====================================
    // Popup closes automatically
    // =====================================

    await expect(
      this.organizationHeadSelectionTitle
    ).not.toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Selected Organization Head
  // =====================================

  async verifySelectedOrganizationHead(
    selectedEmployee
  ) {

    await expect(
      this.organizationHeadSelectionTitle
    ).not.toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.page.getByText(
        selectedEmployee,
        {
          exact: true,
        }
      ).first()
    ).toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Create Button Disabled
  // =====================================

  async verifyCreateButtonDisabled() {

    await expect(
      this.createButton
    ).toBeDisabled({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Create Button Enabled
  // =====================================

  async verifyCreateButtonEnabled() {

    await expect(
      this.createButton
    ).toBeEnabled({
      timeout: 10000,
    });

  }


  // =====================================
  // TC-ORG-CRE-009
  // Verify Organization Name Validation
  // =====================================

  async verifyOrganizationNameValidation() {

    await expect(
      this.organizationNameInput
    ).toBeVisible({
      timeout: 10000,
    });


    // =====================================
    // Make sure Name is empty
    // =====================================

    await this.organizationNameInput.fill('');


    // =====================================
    // Trigger validation by moving focus
    // =====================================

    await this.organizationDescriptionInput.click();


    // =====================================
    // Verify red validation styling
    // =====================================

    await expect(
      this.organizationNameInput
    ).toHaveClass(
      /border-red-500/,
      {
        timeout: 10000,
      }
    );

  }


  // =====================================
  // TC-ORG-CRE-010
  // Verify Description Validation
  // =====================================

  async verifyOrganizationDescriptionValidation() {

    await expect(
      this.organizationDescriptionInput
    ).toBeVisible({
      timeout: 10000,
    });


    // =====================================
    // Make sure Description is empty
    // =====================================

    await this.organizationDescriptionInput.fill('');


    // =====================================
    // Trigger validation by moving focus
    // =====================================

    await this.organizationNameInput.click();


    // =====================================
    // Verify red validation styling
    // =====================================

    await expect(
      this.organizationDescriptionInput
    ).toHaveClass(
      /border-red-500/,
      {
        timeout: 10000,
      }
    );

  }


  // =====================================
  // Create Organization
  // =====================================

  async createOrganization() {

    await expect(
      this.createButton
    ).toBeEnabled({
      timeout: 10000,
    });


    await this.createButton.click();


    // =====================================
    // Verify drawer closes
    // =====================================

    await expect(
      this.addOrganizationDrawerTitle
    ).not.toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Created Organization
  // =====================================

  async verifyOrganizationCreated(
    organizationName
  ) {

    await expect(
      this.page.getByText(
        organizationName,
        {
          exact: true,
        }
      )
    ).toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Create Test Organization
  // =====================================

  async createTestOrganization(
    organizationName,
    description,
    telephone,
    address,
    email,
    website
  ) {

    await this.openAddOrganizationDrawer();


    // =====================================
    // Fill required fields
    // =====================================

    await this.fillOrganizationDetails(
      organizationName,
      description
    );


    // =====================================
    // Select Organization Head
    // =====================================

    await this.openOrganizationHeadSelection();

    await this.selectOrganizationHead();

    await this.saveOrganizationHeadSelection();


    // =====================================
    // Fill optional fields
    // =====================================

    await this.fillContactInformation(
      telephone,
      address,
      email,
      website
    );


    // =====================================
    // Create
    // =====================================

    await this.createOrganization();


    // =====================================
    // Verify
    // =====================================

    await this.verifyOrganizationCreated(
      organizationName
    );

  }


  // =====================================
  // Get Organization Card by Position
  // =====================================

  getOrganizationCard(position) {

    if (position < 1) {

      throw new Error(
        'Organization position must be 1 or greater.'
      );

    }


    return this.organizationCards.nth(
      position - 1
    );

  }


  // =====================================
  // Get Delete Button from Organization
  // =====================================

  getDeleteButtonFromOrganization(
    position
  ) {

    const organizationCard =
      this.getOrganizationCard(
        position
      );


    return organizationCard.locator(
      'button:has(svg.lucide-trash-2)'
    );

  }


  // =====================================
  // Open Remove Organization Popup
  // =====================================

  async openRemoveOrganizationPopup(
    position
  ) {

    const organizationCount =
      await this.organizationCards.count();


    console.log(
      `Organization cards found: ${organizationCount}`
    );


    expect(
      organizationCount
    ).toBeGreaterThanOrEqual(position);


    const organizationCard =
      this.getOrganizationCard(
        position
      );


    await expect(
      organizationCard
    ).toBeVisible({
      timeout: 10000,
    });


    const deleteButton =
      this.getDeleteButtonFromOrganization(
        position
      );


    await expect(
      deleteButton
    ).toBeVisible({
      timeout: 10000,
    });


    console.log(
      `Deleting organization at position: ${position}`
    );


    await deleteButton.click();


    await expect(
      this.removeOrganizationTitle
    ).toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Remove Organization Popup
  // =====================================

  async verifyRemoveOrganizationPopup() {

    await expect(
      this.removeOrganizationTitle
    ).toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Organization Name Input
  // =====================================

  async verifyOrganizationNameInput() {

    await expect(
      this.removeOrganizationNameInput
    ).toBeVisible({
      timeout: 10000,
    });


    await expect(
      this.removeOrganizationNameInput
    ).toHaveValue('');

  }


  // =====================================
  // Enter Organization Name
  // =====================================

  async enterOrganizationNameForDeletion(
    organizationName
  ) {

    await expect(
      this.removeOrganizationNameInput
    ).toBeVisible({
      timeout: 10000,
    });


    await this.removeOrganizationNameInput.fill(
      organizationName
    );

  }


  // =====================================
  // Verify Confirm Button Disabled
  // =====================================

  async verifyConfirmButtonDisabled() {

    await expect(
      this.removeOrganizationConfirmButton
    ).toBeDisabled({
      timeout: 10000,
    });

  }


  // =====================================
  // Verify Confirm Button Enabled
  // =====================================

  async verifyConfirmButtonEnabled() {

    await expect(
      this.removeOrganizationConfirmButton
    ).toBeEnabled({
      timeout: 10000,
    });

  }


  // =====================================
  // Confirm Organization Deletion
  // =====================================

  async confirmOrganizationDeletion() {

    await expect(
      this.removeOrganizationConfirmButton
    ).toBeEnabled({
      timeout: 10000,
    });


    await this.removeOrganizationConfirmButton.click();


    await expect(
      this.removeOrganizationTitle
    ).not.toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Cancel Organization Deletion
  // =====================================

  async cancelOrganizationDeletion() {

    await expect(
      this.removeOrganizationCancelButton
    ).toBeVisible({
      timeout: 10000,
    });


    await this.removeOrganizationCancelButton.click();


    await expect(
      this.removeOrganizationTitle
    ).not.toBeVisible({
      timeout: 10000,
    });

  }


  // =====================================
  // Close Remove Organization Popup
  // Using X Button
  // =====================================

  async closeRemoveOrganizationPopup() {

    await expect(
      this.removeOrganizationCloseButton
    ).toBeVisible({
      timeout: 10000,
    });


    await this.removeOrganizationCloseButton.click();


    await expect(
      this.removeOrganizationTitle
    ).not.toBeVisible({
      timeout: 10000,
    });

  }

}

export default OrganizationPage;
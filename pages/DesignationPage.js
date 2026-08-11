class DesignationPage {
  constructor(page) {
    this.page = page;

    // System Configuration
    this.systemConfigurationButton = page.locator(
      'a[href="/system_configurations"]'
    );

    // Second sidebar icon - Organization
    this.organizationIcon = page
      .locator('a:has(span[title="Organization"])')
      .first();

    // Designation
    this.designationMenu = page.locator(
      'a[href="/designation"]'
    );
  }

  // =====================================
  // Navigate to System Configuration
  // =====================================

  async navigateToSystemConfiguration() {
    await this.systemConfigurationButton.waitFor({
      state: 'visible',
      timeout: 30000
    });

    await this.systemConfigurationButton.click();

    await this.page.waitForLoadState('networkidle');

    await this.page.waitForURL(
      'https://app.optiomax.com/system_configurations',
      {
        timeout: 30000
      }
    );
  }

  // =====================================
  // Hover Organization
  // =====================================

  async hoverOrganization() {
    await this.organizationIcon.waitFor({
      state: 'visible',
      timeout: 30000
    });

    await this.organizationIcon.hover();

    await this.designationMenu.waitFor({
      state: 'visible',
      timeout: 10000
    });
  }

  // =====================================
  // Click Designation
  // =====================================

  async clickDesignation() {
    await this.designationMenu.click();

    await this.page.waitForLoadState('networkidle');

    await this.page.waitForURL(
      'https://app.optiomax.com/designation',
      {
        timeout: 30000
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
    await this.page.waitForURL(
      'https://app.optiomax.com/designation',
      {
        timeout: 30000
      }
    );
  }
}

module.exports = DesignationPage;
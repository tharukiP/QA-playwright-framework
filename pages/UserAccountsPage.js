import { expect } from '@playwright/test';

export class UserAccountsPage {
  constructor(page) {
    this.page = page;

    // Dashboard: System Configuration button
    this.systemConfigurationButton = page.locator(
      'a[href="/system_configurations"]'
    );

    // System Configuration: People & Access icon
    this.peopleAndAccessIcon = page
      .locator('a:has(span[title="People & Access"])')
      .first();

    // People & Access dropdown: User Accounts link
    this.userAccountsLink = page.locator(
      'a[href="/user_accounts"]'
    );

    // User Accounts page heading
    this.userAccountsTitle = page.getByRole('heading', {
      name: /User Accounts/i,
    });
  }

  async navigateToUserAccounts() {
    // Dashboard -> System Configurations
    await this.systemConfigurationButton.click();

    await expect(this.page).toHaveURL(
      /system_configurations/
    );

    // Hover People & Access
    await this.peopleAndAccessIcon.hover();

    // Verify User Accounts option is visible
    await expect(this.userAccountsLink).toBeVisible();

    // Click User Accounts
    await this.userAccountsLink.click();

    // Verify User Accounts page URL
    await expect(this.page).toHaveURL(
      'https://app.optiomax.com/user_accounts'
    );

    // Verify User Accounts page heading
    await expect(this.userAccountsTitle).toBeVisible();
  }
}
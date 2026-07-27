import { expect } from '@playwright/test';

export class EmployeeProfilePage {
  constructor(page) {
    this.page = page;

    // Dashboard
    this.systemConfigurationButton = page.locator(
      'a[href="/system_configurations"]'
    );

    // System Configuration
    this.peopleAndAccessIcon = page.locator(
        'a:has(span[title="People & Access"])'
      ).first();


    this.employeeProfileLink = page.locator(
      'a[href="/employee_profile"]'
    );

    // Employee Profile page
    this.employeeProfileTitle = page.getByRole('heading', {
        name: /Employee Profile/i,
      });
  }

  async navigateToEmployeeProfile() {
    // Dashboard -> System Configuration
    await this.systemConfigurationButton.click();
    await expect(this.page).toHaveURL(/system_configurations/);



    // Hover People & Access
    await this.peopleAndAccessIcon.hover();

    // Click Employee Profile
    await this.employeeProfileLink.click();

    // Verify Employee Profile page
    await expect(this.page).toHaveURL(
        'https://app.optiomax.com/employee_profile'
      );
      
      await expect(this.employeeProfileTitle).toBeVisible();
    }
}

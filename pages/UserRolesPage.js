import { expect } from '@playwright/test';

export class UserRolesPage {
  constructor(page) {
    this.page = page;

    // =====================================
    // Dashboard
    // =====================================

    this.systemConfigurationButton = page.locator(
      'a[href="/system_configurations"]'
    );

    // =====================================
    // System Configuration
    // =====================================

    this.peopleAndAccessIcon = page
      .locator('a:has(span[title="People & Access"])')
      .first();

    this.userRolesLink = page.locator(
      'a[href="/user_roles"]'
    );

    // =====================================
    // User Roles page
    // =====================================

    this.userRolesTitle = page.getByRole('heading', {
      name: /User Roles/i,
    });

    this.addNewUserRoleButton = page.getByRole('button', {
      name: /Add New User Role/i,
    });

    // =====================================
    // Add New Role drawer
    // =====================================

    this.addRoleDrawerTitle = page.getByRole('heading', {
      name: /Add new role/i,
    });

    this.roleNameInput = page.locator(
      'input[name="name"]'
    );

    this.roleDescriptionInput = page.locator(
      'textarea[name="role_description"]'
    );

    this.saveButton = page.getByRole('button', {
      name: /^Save$/i,
    });

    this.closeDrawerButton = page.getByRole('button', {
      name: /Close drawer/i,
    });
  }

  // =====================================
  // Open User Roles page directly
  // Uses saved authentication
  // =====================================

  async open() {
    await this.page.goto('/user_roles');

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );

    await expect(this.userRolesTitle).toBeVisible({
      timeout: 30000,
    });

    await expect(
      this.addNewUserRoleButton
    ).toBeVisible({
      timeout: 30000,
    });
  }

  // =====================================
  // Navigate from Dashboard to User Roles
  // Use only when navigation needs testing
  // =====================================

  async navigateToUserRoles() {
    await expect(
      this.systemConfigurationButton
    ).toBeVisible({
      timeout: 30000,
    });

    await this.systemConfigurationButton.click();

    await expect(this.page).toHaveURL(
      /\/system_configurations\/?$/
    );

    await expect(this.peopleAndAccessIcon).toBeVisible({
      timeout: 30000,
    });

    await this.peopleAndAccessIcon.hover();

    await expect(this.userRolesLink).toBeVisible({
      timeout: 30000,
    });

    await this.userRolesLink.click();

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );

    await expect(this.userRolesTitle).toBeVisible({
      timeout: 30000,
    });
  }

  // =====================================
  // Open Add New Role drawer
  // =====================================

  async openAddNewRoleDrawer() {
    await expect(
      this.addNewUserRoleButton
    ).toBeVisible();

    await expect(
      this.addNewUserRoleButton
    ).toBeEnabled();

    await this.addNewUserRoleButton.click();

    await expect(this.addRoleDrawerTitle).toBeVisible({
      timeout: 30000,
    });

    await expect(this.roleNameInput).toBeVisible();

    await expect(
      this.roleDescriptionInput
    ).toBeVisible();

    await expect(this.saveButton).toBeVisible();
  }

  // =====================================
  // Create a valid User Role
  // =====================================

  async createUserRole(roleName, roleDescription) {
    await this.roleNameInput.fill(roleName);

    await this.roleDescriptionInput.fill(
      roleDescription
    );

    await this.saveButton.click();

    await expect(
      this.addRoleDrawerTitle
    ).not.toBeVisible({
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );

    await expect(
      this.page.getByText(roleName, {
        exact: true,
      }).first()
    ).toBeVisible({
      timeout: 30000,
    });
  }

  // =====================================
  // Verify Role Name is required
  // =====================================

  async verifyRoleNameRequired(roleDescription) {
    await this.roleNameInput.fill('');

    await this.roleDescriptionInput.fill(
      roleDescription
    );

    await this.saveButton.click();

    await expect(this.addRoleDrawerTitle).toBeVisible();

    await expect(this.roleNameInput).toHaveClass(
      /border-red/
    );

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );
  }

  // =====================================
  // Verify Role Description is required
  // =====================================

  async verifyRoleDescriptionRequired(roleName) {
    await this.roleNameInput.fill(roleName);

    await this.roleDescriptionInput.fill('');

    await this.saveButton.click();

    await expect(this.addRoleDrawerTitle).toBeVisible();

    await expect(
      this.roleDescriptionInput
    ).toHaveClass(/border-red/);

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );
  }

  // =====================================
  // Verify both fields are required
  // =====================================

  async verifyBothFieldsRequired() {
    await this.roleNameInput.fill('');

    await this.roleDescriptionInput.fill('');

    await this.saveButton.click();

    await expect(this.addRoleDrawerTitle).toBeVisible();

    await expect(this.roleNameInput).toHaveClass(
      /border-red/
    );

    await expect(
      this.roleDescriptionInput
    ).toHaveClass(/border-red/);

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );
  }

  // =====================================
  // Verify duplicate Role Name
  // =====================================

  async verifyDuplicateRole(
    duplicateRoleName,
    roleDescription
  ) {
    await this.roleNameInput.fill(
      duplicateRoleName
    );

    await this.roleDescriptionInput.fill(
      roleDescription
    );

    await this.saveButton.click();

    await expect(this.addRoleDrawerTitle).toBeVisible();

    await expect(
      this.page.getByText(
        /already exists|duplicate|role name.*exists/i
      ).first()
    ).toBeVisible({
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );
  }

  // =====================================
  // Close Add New Role drawer
  // =====================================

  async closeAddNewRoleDrawer() {
    await expect(this.closeDrawerButton).toBeVisible();

    await this.closeDrawerButton.click();

    await expect(
      this.addRoleDrawerTitle
    ).not.toBeVisible({
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );
  }
}
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

    this.addNewUserRoleButton = page.getByRole(
      'button',
      {
        name: /Add New User Role/i,
      }
    );

    this.searchRoleInput = page.getByPlaceholder(
      'Search roles name'
    );

    // =====================================
    // Add/Edit Role drawer
    // =====================================

    this.addRoleDrawerTitle = page.getByRole(
      'heading',
      {
        name: /Add new role/i,
      }
    );

    this.editRoleDrawerTitle = page.getByRole(
      'heading',
      {
        name: /Update role details/i,
      }
    );

    this.roleNameInput = page.locator(
      'input[name="name"]'
    );

    this.roleDescriptionInput = page.locator(
      'textarea[name="role_description"]'
    );

    this.saveButton = page.getByRole('button', {
      name: /^Save$/i,
    });

    this.updateButton = page.getByRole('button', {
      name: /^Save$/i,
    });

    this.closeDrawerButton = page.getByRole(
      'button',
      {
        name: /Close drawer/i,
      }
    );

    // =====================================
    // Remove Role popup
    // =====================================

    this.removeRolePopupTitle = page.getByRole(
      'heading',
      {
        name: /^Remove role$/i,
      }
    );

    this.deleteConfirmationInput = page.locator(
      'form input[name="name"][type="text"]'
    );

    this.cancelDeleteButton = page.getByRole(
      'button',
      {
        name: /^Cancel$/i,
      }
    );

    this.confirmDeleteButton = page.getByRole(
      'button',
      {
        name: /^Confirm$/i,
      }
    );
  }

  // =====================================
  // Open User Roles page directly
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
  // Navigate from Dashboard
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

    await expect(
      this.peopleAndAccessIcon
    ).toBeVisible({
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

    await expect(
      this.addRoleDrawerTitle
    ).toBeVisible({
      timeout: 30000,
    });

    await expect(this.roleNameInput).toBeVisible();

    await expect(
      this.roleDescriptionInput
    ).toBeVisible();

    await expect(this.saveButton).toBeVisible();
  }

  // =====================================
  // Create User Role
  // =====================================

  async createUserRole(
    roleName,
    roleDescription
  ) {
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
      this.page
        .getByText(roleName, {
          exact: true,
        })
        .first()
    ).toBeVisible({
      timeout: 30000,
    });
  }

  // =====================================
  // Required field validations
  // =====================================

  async verifyRoleNameRequired(
    roleDescription
  ) {
    await this.roleNameInput.fill('');

    await this.roleDescriptionInput.fill(
      roleDescription
    );

    await this.saveButton.click();

    await expect(
      this.addRoleDrawerTitle
    ).toBeVisible();

    await expect(this.roleNameInput).toHaveClass(
      /border-red/
    );
  }

  async verifyRoleDescriptionRequired(
    roleName
  ) {
    await this.roleNameInput.fill(roleName);

    await this.roleDescriptionInput.fill('');

    await this.saveButton.click();

    await expect(
      this.addRoleDrawerTitle
    ).toBeVisible();

    await expect(
      this.roleDescriptionInput
    ).toHaveClass(/border-red/);
  }

  async verifyBothFieldsRequired() {
    await this.roleNameInput.fill('');

    await this.roleDescriptionInput.fill('');

    await this.saveButton.click();

    await expect(
      this.addRoleDrawerTitle
    ).toBeVisible();

    await expect(this.roleNameInput).toHaveClass(
      /border-red/
    );

    await expect(
      this.roleDescriptionInput
    ).toHaveClass(/border-red/);
  }

  // =====================================
  // Duplicate Role validation
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

    await expect(
      this.addRoleDrawerTitle
    ).toBeVisible();

    await expect(
      this.page
        .getByText(
          /already exists|duplicate|role name.*exists/i
        )
        .first()
    ).toBeVisible({
      timeout: 30000,
    });
  }

  // =====================================
  // Close Add Role drawer
  // =====================================

  async closeAddNewRoleDrawer() {
    await expect(
      this.closeDrawerButton
    ).toBeVisible();

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

  // =====================================
  // Search User Role
  // =====================================

  async searchRole(roleName) {
    await expect(
      this.searchRoleInput
    ).toBeVisible({
      timeout: 30000,
    });

    await this.searchRoleInput.fill('');

    await this.searchRoleInput.fill(roleName);

    await this.page.waitForTimeout(1500);
  }

  // =====================================
  // Get searched Role card
  // =====================================

  getRoleCard(roleName) {
    return this.page
      .locator('div.relative.p-3')
      .filter({
        has: this.page.getByText(roleName, {
          exact: true,
        }),
      })
      .first();
  }

  // =====================================
  // Edit Role
  // =====================================

  getEditButton(roleName) {
    const roleCard =
      this.getRoleCard(roleName);

    return roleCard
      .locator('button')
      .filter({
        has: this.page.locator('svg'),
      })
      .nth(2);
  }

  async verifyEditButtonDisplayed(roleName) {
    const roleCard =
      this.getRoleCard(roleName);

    await expect(roleCard).toBeVisible({
      timeout: 30000,
    });

    const editButton =
      this.getEditButton(roleName);

    await expect(editButton).toBeVisible({
      timeout: 30000,
    });
  }

  async clickEditRole(roleName) {
    const roleCard =
      this.getRoleCard(roleName);

    await expect(roleCard).toBeVisible({
      timeout: 30000,
    });

    await roleCard.scrollIntoViewIfNeeded();

    const editButton =
      this.getEditButton(roleName);

    await expect(editButton).toBeVisible({
      timeout: 30000,
    });

    await expect(editButton).toBeEnabled();

    await editButton.click();

    await expect(
      this.editRoleDrawerTitle
    ).toBeVisible({
      timeout: 30000,
    });

    await expect(this.roleNameInput).toBeVisible({
      timeout: 30000,
    });

    await expect(
      this.roleDescriptionInput
    ).toBeVisible({
      timeout: 30000,
    });
  }

  async openEditRoleDrawer(roleName) {
    await this.clickEditRole(roleName);
  }

  async updateRoleName(updatedRoleName) {
    await expect(
      this.roleNameInput
    ).toBeVisible();

    await this.roleNameInput.fill(
      updatedRoleName
    );
  }

  async updateRoleDescription(
    updatedDescription
  ) {
    await expect(
      this.roleDescriptionInput
    ).toBeVisible();

    await this.roleDescriptionInput.fill(
      updatedDescription
    );
  }

  async clickUpdateRole() {
    await expect(this.updateButton).toBeVisible({
      timeout: 30000,
    });

    await expect(this.updateButton).toBeEnabled();

    await this.updateButton.click();

    await expect(
      this.editRoleDrawerTitle
    ).not.toBeVisible({
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );
  }

  async updateUserRole(
    currentRoleName,
    updatedRoleName,
    updatedDescription
  ) {
    await this.openEditRoleDrawer(
      currentRoleName
    );

    await this.updateRoleName(
      updatedRoleName
    );

    await this.updateRoleDescription(
      updatedDescription
    );

    await this.clickUpdateRole();
  }

  async verifyUpdatedRoleDisplayed(
    updatedRoleName,
    updatedDescription
  ) {
    await this.searchRole(updatedRoleName);

    await expect(
      this.page
        .getByText(updatedRoleName, {
          exact: true,
        })
        .first()
    ).toBeVisible({
      timeout: 30000,
    });

    await expect(
      this.page
        .getByText(updatedDescription, {
          exact: true,
        })
        .first()
    ).toBeVisible({
      timeout: 30000,
    });
  }

  // =====================================
  // Delete User Role
  // =====================================

  getDeleteButton(roleName) {
    const roleCard =
      this.getRoleCard(roleName);

    return roleCard
      .locator('button')
      .filter({
        has: this.page.locator(
          'svg.text-red-400'
        ),
      })
      .first();
  }

  async verifyDeleteButtonDisplayed(
    roleName
  ) {
    const roleCard =
      this.getRoleCard(roleName);

    await expect(roleCard).toBeVisible({
      timeout: 30000,
    });

    const deleteButton =
      this.getDeleteButton(roleName);

    await expect(deleteButton).toBeVisible({
      timeout: 30000,
    });
  }

  async clickDeleteRole(roleName) {
    const roleCard =
      this.getRoleCard(roleName);

    await expect(roleCard).toBeVisible({
      timeout: 30000,
    });

    await roleCard.scrollIntoViewIfNeeded();

    await roleCard.hover();

    const deleteButton =
      this.getDeleteButton(roleName);

    await expect(deleteButton).toBeVisible({
      timeout: 30000,
    });

    await expect(deleteButton).toBeEnabled();

    await deleteButton.click();

    await expect(
      this.removeRolePopupTitle
    ).toBeVisible({
      timeout: 30000,
    });
  }

  async verifyRemoveRolePopup(roleName) {
    await expect(
      this.removeRolePopupTitle
    ).toBeVisible({
      timeout: 30000,
    });

    await expect(
      this.page.getByText(
        `To confirm, please type ${roleName}.`,
        {
          exact: false,
        }
      )
    ).toBeVisible({
      timeout: 30000,
    });

    await expect(
      this.deleteConfirmationInput
    ).toBeVisible();
  }

  async cancelDeleteRole() {
    await expect(
      this.cancelDeleteButton
    ).toBeVisible();

    await this.cancelDeleteButton.click();

    await expect(
      this.removeRolePopupTitle
    ).not.toBeVisible({
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/
    );
  }

  async enterDeleteConfirmation(roleName) {
    await expect(
      this.deleteConfirmationInput
    ).toBeVisible({
      timeout: 30000,
    });

    await this.deleteConfirmationInput.fill(
      roleName
    );
  }

  async verifyConfirmButtonDisabled() {
    await expect(
      this.confirmDeleteButton
    ).toBeDisabled();
  }

  async verifyConfirmButtonEnabled() {
    await expect(
      this.confirmDeleteButton
    ).toBeEnabled();
  }

  async confirmDeleteRole() {
    await expect(
      this.confirmDeleteButton
    ).toBeVisible();

    await expect(
      this.confirmDeleteButton
    ).toBeEnabled();

    await this.confirmDeleteButton.click();

    await expect(
      this.removeRolePopupTitle
    ).not.toBeVisible({
      timeout: 30000,
    });

    await expect(this.page).toHaveURL(
      /\/user_roles\/?$/,
      {
        timeout: 30000,
      }
    );
  }

  async verifyDeleteSuccessNotification() {
    await expect(
      this.page
        .getByText(
          /role.*deleted|deleted.*successfully/i
        )
        .first()
    ).toBeVisible({
      timeout: 30000,
    });
  }

  async verifyRoleIsDeleted(roleName) {
    await this.searchRole(roleName);

    await expect(
      this.page.getByText(roleName, {
        exact: true,
      })
    ).toHaveCount(0, {
      timeout: 30000,
    });
  }
}
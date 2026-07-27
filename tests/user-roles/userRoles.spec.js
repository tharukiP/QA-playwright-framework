import { test, expect } from '@playwright/test';
import { UserRolesPage } from '../../pages/UserRolesPage';
import { userRolesData } from '../../test-data/userRolesData';

test.describe('User Roles Page Tests', () => {
  let userRolesPage;

  test.beforeEach(async ({ page }) => {
    userRolesPage = new UserRolesPage(page);
  
    // Uses saved login authentication.
    // No login page and no sidebar navigation.
    await userRolesPage.open();
  });

  test(
    'TC-01: Verify User Roles page is displayed',
    async ({ page }) => {
      await expect(page).toHaveURL(
        /\/user_roles\/?$/
      );

      await expect(
        userRolesPage.userRolesTitle
      ).toBeVisible();
    }
  );

  test(
    'TC-02: Verify Add New User Role drawer opens',
    async () => {
      await userRolesPage.openAddNewRoleDrawer();
    }
  );

  test(
    'TC-03: Verify successful User Role creation',
    async () => {
      await userRolesPage.openAddNewRoleDrawer();

      await userRolesPage.createUserRole(
        userRolesData.validRole.name,
        userRolesData.validRole.description
      );
    }
  );

  test(
    'TC-04: Verify Role Name is required',
    async () => {
      await userRolesPage.openAddNewRoleDrawer();

      await userRolesPage.verifyRoleNameRequired(
        userRolesData.roleWithoutName.description
      );
    }
  );

  test(
    'TC-05: Verify Role Description is required',
    async () => {
      await userRolesPage.openAddNewRoleDrawer();

      await userRolesPage.verifyRoleDescriptionRequired(
        userRolesData.roleWithoutDescription.name
      );
    }
  );

  test(
    'TC-06: Verify Role Name and Description are required',
    async () => {
      await userRolesPage.openAddNewRoleDrawer();

      await userRolesPage.verifyBothFieldsRequired();
    }
  );

  test(
    'TC-07: Verify duplicate User Role name is not allowed',
    async () => {
      await userRolesPage.openAddNewRoleDrawer();

      await userRolesPage.verifyDuplicateRole(
        userRolesData.duplicateRole.name,
        userRolesData.duplicateRole.description
      );
    }
  );

  test(
    'TC-08: Verify Add New Role drawer can be closed',
    async () => {
      await userRolesPage.openAddNewRoleDrawer();

      await userRolesPage.closeAddNewRoleDrawer();
    }
  );
});
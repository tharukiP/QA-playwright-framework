import { test, expect } from '@playwright/test';
import { UserRolesPage } from '../../pages/UserRolesPage';
import { userRolesData } from '../../test-data/userRolesData';

test.describe.serial('Edit User Role Tests', () => {
  let userRolesPage;

  const existingRoleName =
    userRolesData.editRole.existingRoleName;

  const updatedRoleName =
    userRolesData.editRole.updatedRoleName;

  const updatedDescription =
    userRolesData.editRole.updatedDescription;

  test.beforeEach(async ({ page }) => {
    userRolesPage = new UserRolesPage(page);

    await userRolesPage.open();

    await expect(page).toHaveURL(
      /\/user_roles\/?$/
    );
  });

  test(
    'TC-08: Verify Edit button is displayed',
    async () => {
      await userRolesPage.searchRole(
        existingRoleName
      );

      await expect(
        userRolesPage.getEditButton(
          existingRoleName
        )
      ).toBeVisible({
        timeout: 30000,
      });
    }
  );

  test(
    'TC-09: Verify user can open the Edit User Role drawer',
    async () => {
      await userRolesPage.searchRole(
        existingRoleName
      );

      await userRolesPage.clickEditRole(
        existingRoleName
      );

      await expect(
        userRolesPage.editRoleDrawerTitle
      ).toBeVisible({
        timeout: 30000,
      });

      await expect(
        userRolesPage.roleNameInput
      ).toBeVisible();

      await expect(
        userRolesPage.roleDescriptionInput
      ).toBeVisible();

      await expect(
        userRolesPage.roleNameInput
      ).toHaveValue(existingRoleName);
    }
  );

  test(
    'TC-10: Verify user can edit the role name and description',
    async ({ page }) => {
      await userRolesPage.searchRole(
        existingRoleName
      );

      await userRolesPage.clickEditRole(
        existingRoleName
      );

      await userRolesPage.updateRoleName(
        updatedRoleName
      );

      await userRolesPage.updateRoleDescription(
        updatedDescription
      );

      await userRolesPage.clickUpdateRole();

      await expect(
        userRolesPage.editRoleDrawerTitle
      ).not.toBeVisible({
        timeout: 30000,
      });

      await userRolesPage.searchRole(
        updatedRoleName
      );

      await expect(
        page.getByText(updatedRoleName, {
          exact: true,
        }).first()
      ).toBeVisible({
        timeout: 30000,
      });
    }
  );

  test(
    'TC-12: Verify updated role data is displayed',
    async ({ page }) => {
      await userRolesPage.searchRole(
        updatedRoleName
      );

      await expect(
        page.getByText(updatedRoleName, {
          exact: true,
        }).first()
      ).toBeVisible({
        timeout: 30000,
      });

      await userRolesPage.clickEditRole(
        updatedRoleName
      );

      await expect(
        userRolesPage.roleNameInput
      ).toHaveValue(updatedRoleName);

      await expect(
        userRolesPage.roleDescriptionInput
      ).toHaveValue(updatedDescription);
    }
  );
});
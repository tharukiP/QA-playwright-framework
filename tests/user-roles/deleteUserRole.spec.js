import {
    test,
    expect,
  } from '@playwright/test';
  
  import {
    UserRolesPage,
  } from '../../pages/UserRolesPage';
  
  import {
    userRolesData,
  } from '../../test-data/userRolesData';
  
  test.describe.serial(
    'Delete User Role Tests',
    () => {
      let userRolesPage;
  
      const roleName =
        userRolesData.deleteRole.name;
  
      const roleDescription =
        userRolesData.deleteRole.description;
  
      test.beforeEach(async ({ page }) => {
        userRolesPage =
          new UserRolesPage(page);
  
        // Open User Roles page using saved authentication
        await userRolesPage.open();
  
        await expect(page).toHaveURL(
          /\/user_roles\/?$/
        );
      });
  
      test(
        'TC-09: Create a user role for delete testing',
        async ({ page }) => {
          await userRolesPage
            .openAddNewRoleDrawer();
  
          await userRolesPage.createUserRole(
            roleName,
            roleDescription
          );
  
          await userRolesPage.searchRole(
            roleName
          );
  
          await expect(
            page
              .getByText(roleName, {
                exact: true,
              })
              .first()
          ).toBeVisible({
            timeout: 30000,
          });
        }
      );
  
      test(
        'TC-10: Verify Delete button is displayed',
        async () => {
          await userRolesPage.searchRole(
            roleName
          );
  
          await userRolesPage
            .verifyDeleteButtonDisplayed(
              roleName
            );
        }
      );
  
      test(
        'TC-11: Verify Remove Role popup is displayed',
        async () => {
          await userRolesPage.searchRole(
            roleName
          );
  
          await userRolesPage.clickDeleteRole(
            roleName
          );
  
          await userRolesPage
            .verifyRemoveRolePopup(
              roleName
            );
        }
      );
  
      test(
        'TC-12: Verify user can cancel role deletion',
        async ({ page }) => {
          await userRolesPage.searchRole(
            roleName
          );
  
          await userRolesPage.clickDeleteRole(
            roleName
          );
  
          await userRolesPage
            .verifyRemoveRolePopup(
              roleName
            );
  
          await userRolesPage
            .cancelDeleteRole();
  
          await expect(page).toHaveURL(
            /\/user_roles\/?$/
          );
  
          await expect(
            page
              .getByText(roleName, {
                exact: true,
              })
              .first()
          ).toBeVisible({
            timeout: 30000,
          });
        }
      );
  
      test(
        'TC-13: Verify Confirm button is disabled when the confirmation field is empty',
        async () => {
          await userRolesPage.searchRole(
            roleName
          );
  
          await userRolesPage.clickDeleteRole(
            roleName
          );
  
          await userRolesPage
            .verifyConfirmButtonDisabled();
        }
      );
  
      test(
        'TC-14: Verify Confirm button is disabled for an incorrect role name',
        async () => {
          await userRolesPage.searchRole(
            roleName
          );
  
          await userRolesPage.clickDeleteRole(
            roleName
          );
  
          await userRolesPage
            .enterDeleteConfirmation(
              'Incorrect Role Name'
            );
  
          await userRolesPage
            .verifyConfirmButtonDisabled();
        }
      );
  
      test(
        'TC-15: Verify Confirm button is enabled for the correct role name',
        async () => {
          await userRolesPage.searchRole(
            roleName
          );
  
          await userRolesPage.clickDeleteRole(
            roleName
          );
  
          await userRolesPage
            .enterDeleteConfirmation(
              roleName
            );
  
          await userRolesPage
            .verifyConfirmButtonEnabled();
        }
      );
  
      test(
        'TC-16: Verify user role is deleted successfully',
        async ({ page }) => {
          await userRolesPage.searchRole(
            roleName
          );
  
          await expect(
            page
              .getByText(roleName, {
                exact: true,
              })
              .first()
          ).toBeVisible({
            timeout: 30000,
          });
  
          await userRolesPage.clickDeleteRole(
            roleName
          );
  
          await userRolesPage
            .verifyRemoveRolePopup(
              roleName
            );
  
          await userRolesPage
            .enterDeleteConfirmation(
              roleName
            );
  
          await userRolesPage
            .verifyConfirmButtonEnabled();
  
          await userRolesPage
            .confirmDeleteRole();
  
          await expect(page).toHaveURL(
            /\/user_roles\/?$/
          );
  
          await userRolesPage
            .verifyDeleteSuccessNotification();
  
          await userRolesPage
            .verifyRoleIsDeleted(
              roleName
            );
        }
      );
    }
  );
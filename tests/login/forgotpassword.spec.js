import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { forgotPasswordData } from '../../test-data/forgotPasswordData';

test.describe('Forgot Password Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);
        await forgotPasswordPage.openLoginPage();
    });

    test('1. Forgot Password button opens the page', async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();

        await expect(page).toHaveURL(/forgotpassword/);
        await expect(page.getByText('Forgot Password?')).toBeVisible();
    });

    test('2. Valid registered email', async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();
        await forgotPasswordPage.submitResetEmail(forgotPasswordData.validEmail);

        await expect(forgotPasswordPage.checkInboxText).toBeVisible();
    });

    test('3. Unregistered email displays an error toast', async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();
        await forgotPasswordPage.submitResetEmail(forgotPasswordData.unregisteredEmail);

        await expect(forgotPasswordPage.errorToast).toBeVisible();
    });

    test('4. Cancel button returns to Login', async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();
        await forgotPasswordPage.clickCancel();

        await expect(page).toHaveURL('https://app.optiomax.com/');
    });

    test('5. Back to Login link works', async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();
        await forgotPasswordPage.clickBackToLogin();

        await expect(page).toHaveURL('https://app.optiomax.com/');
    });

    test('6. Send Reset Email button remains disabled until a valid email is entered', async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();

        await expect(forgotPasswordPage.sendResetButton).toBeDisabled();

        await forgotPasswordPage.enterEmail(forgotPasswordData.invalidEmailFormat);
        await expect(forgotPasswordPage.sendResetButton).toBeDisabled();

        await forgotPasswordPage.emailInput.clear();

        await forgotPasswordPage.enterEmail(forgotPasswordData.validEmail);
        await expect(forgotPasswordPage.sendResetButton).toBeEnabled();
    });

    test('7. Success page displays "Check your inbox"', async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();
        await forgotPasswordPage.submitResetEmail(forgotPasswordData.validEmail);

        await expect(forgotPasswordPage.checkInboxText).toBeVisible();
    });

    test('8. Success toast message is shown', async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();
        await forgotPasswordPage.submitResetEmail(forgotPasswordData.validEmail);

        await expect(forgotPasswordPage.successToast).toBeVisible();
    });

    test('9. Sign In button on the success page navigates back to the login page', async ({ page }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.openForgotPasswordPage();
        await forgotPasswordPage.submitResetEmail(forgotPasswordData.validEmail);

        await expect(forgotPasswordPage.checkInboxText).toBeVisible();

        await forgotPasswordPage.clickSuccessSignIn();

        await expect(page).toHaveURL('https://app.optiomax.com/');
    });

});
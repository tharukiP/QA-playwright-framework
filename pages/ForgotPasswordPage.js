import { expect } from '@playwright/test';

export class ForgotPasswordPage {
    constructor(page) {
        this.page = page;

        this.forgotPasswordLink = page.getByText('Forgot Password?');

        this.emailInput = page.locator('input[name="email"]');
        this.sendResetButton = page.getByRole('button', { name: /send reset email/i });
        this.cancelButton = page.getByRole('button', { name: /cancel/i });
        this.backToLoginLink = page.getByText('Back to Login');

        this.checkInboxText = page.getByText('Check your inbox');
        this.successToast = page.getByText(/password reset was successful/i);
        this.errorToast = page.getByText(/An error occurred/i);

        this.successSignInButton = page.getByRole('button', { name: /^sign in$/i });
    }

    async openLoginPage() {
        await this.page.goto('https://app.optiomax.com/');
    }

    async openForgotPasswordPage() {
        await this.forgotPasswordLink.click();
        await expect(this.page).toHaveURL(/forgotpassword/);
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async clickSendResetEmail() {
        await this.sendResetButton.click();
    }

    async submitResetEmail(email) {
        await this.enterEmail(email);
        await this.clickSendResetEmail();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickBackToLogin() {
        await this.backToLoginLink.click();
    }

    async clickSuccessSignIn() {
        await this.successSignInButton.click();
    }
}
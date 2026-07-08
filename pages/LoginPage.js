export class LoginPage {
    constructor(page) {
        this.page = page;

        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.signInButton = page.getByRole('button', { name: /sign in/i });
        this.googleButton = page.getByRole('button', { name: /google/i });

this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });

this.showPasswordButton = page.locator('button[type="button"]').last();
    }

    async open() {
        await this.page.goto('https://app.optiomax.com');
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickSignIn();
    }

    async clickGoogleLogin() {
        await this.googleButton.click();
    }
}
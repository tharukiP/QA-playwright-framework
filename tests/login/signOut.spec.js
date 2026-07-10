import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';

test.describe('Sign Out Tests', () => {

    test('User should sign out successfully', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        // Open login page
        await loginPage.open();

        // Login
        await loginPage.login(
            'iamtharuki@gmail.com',
            'Tharuki@123'
        );

        // Verify dashboard
        await expect(page).toHaveURL(/dashboard/);

        // Sign out
        await homePage.signOut();

        // Verify redirected to login page
       await expect(page).toHaveURL(/app\.optiomax\.com/);

        // Verify Welcome Back heading
        await expect(
            page.getByRole('heading', { name: 'Welcome Back' })
        ).toBeVisible();

    });

});
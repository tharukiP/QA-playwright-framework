export class HomePage {
    constructor(page) {
        this.page = page;

        // Profile/avatar button at the bottom of the left sidebar
        this.profileButton = page
            .locator('button')
            .filter({ has: page.locator('img') })
            .last();

        // Sign out button inside the profile menu
        this.signOutButton = page.getByRole('button', {
            name: 'Sign out',
            exact: true
        });
    }

    async signOut() {
        // Hover over the profile image
        await this.profileButton.hover();

        // Wait until the Sign out button appears
        await this.signOutButton.waitFor({
            state: 'visible',
            timeout: 10000
        });

        // Click Sign out
        await this.signOutButton.click();
    }
}
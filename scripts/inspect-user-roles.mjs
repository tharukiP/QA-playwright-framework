import { chromium } from '@playwright/test';

const email = 'iamtharuki@gmail.com';
const password = 'Tharuki@123';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

async function dump(title) {
  console.log(`\n===== ${title} =====`);
  console.log('URL:', page.url());
  const matches = await page.locator('a, button').evaluateAll((els) =>
    els
      .filter((el) => {
        const text = (el.textContent || '').trim();
        const href = el.getAttribute('href') || '';
        const title = el.getAttribute('title') || '';
        return (
          /system|configuration|people|access|user role|gear/i.test(
            `${text} ${href} ${title}`
          ) && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
        );
      })
      .map((el) => ({
        tag: el.tagName,
        href: el.getAttribute('href'),
        title: el.getAttribute('title'),
        text: (el.textContent || '').trim().slice(0, 80),
      }))
  );
  console.log(JSON.stringify(matches, null, 2));
}

try {
  await page.goto('https://app.optiomax.com');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL(/dashboard/i, { timeout: 60000 });
  await page.waitForLoadState('networkidle');
  await dump('DASHBOARD');

  const sysConfig = page.locator('a[href="/system_configurations"]');
  if (await sysConfig.count()) {
    await sysConfig.first().click({ force: true });
    await page.waitForURL(/system_configurations/i, { timeout: 15000 });
  } else {
    const byTitle = page.locator('[title="System Configurations"]');
    console.log('title selector count:', await byTitle.count());
    if (await byTitle.count()) {
      await byTitle.first().click({ force: true });
      await page.waitForURL(/system_configurations/i, { timeout: 15000 });
    } else {
      await page.goto('https://app.optiomax.com/system_configurations');
      await page.waitForLoadState('networkidle');
    }
  }

  await dump('SYSTEM CONFIG');

  const peopleAccessLink = page.getByRole('link', { name: /^People & Access$/i });
  const peopleAccessText = page.getByText(/^People & Access$/i);
  console.log('people link count:', await peopleAccessLink.count());
  console.log('people text count:', await peopleAccessText.count());

  if (await peopleAccessLink.count()) {
    await peopleAccessLink.first().hover();
  } else if (await peopleAccessText.count()) {
    await peopleAccessText.first().hover();
  }

  await page.waitForTimeout(800);
  await dump('AFTER PEOPLE HOVER');

  const userRoles = page.locator('a[href="/user_roles"]');
  console.log('user roles links:', await userRoles.count());
  if (await userRoles.count()) {
    await userRoles.filter({ hasText: 'User Roles' }).first().click();
    await page.waitForURL(/user_roles/i, { timeout: 15000 });
  }

  await dump('USER ROLES PAGE');

  await page.getByRole('button', { name: /Add New User Role/i }).click();
  await page.waitForTimeout(1000);

  const labels = await page.locator('label').evaluateAll((els) =>
    els.map((el) => el.textContent?.trim()).filter(Boolean)
  );
  console.log('LABELS:', labels);

  const inputs = await page.locator('input, textarea').evaluateAll((els) =>
    els.map((el) => ({
      name: el.getAttribute('name'),
      id: el.id,
      placeholder: el.getAttribute('placeholder'),
      ariaLabel: el.getAttribute('aria-label'),
    }))
  );
  console.log('INPUTS:', JSON.stringify(inputs, null, 2));

  await page.getByRole('button', { name: /^Save$/i }).click();
  await page.waitForTimeout(1500);
  const bodyText = await page.locator('body').innerText();
  console.log(
    'VALIDATION:',
    bodyText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => /required|already|duplicate|cannot|taken|exist|same/i.test(l))
  );

  const roleInput = page.getByLabel(/^Role$/i);
  const descInput = page.getByLabel(/description/i);
  console.log('role label count:', await roleInput.count());
  console.log('desc label count:', await descInput.count());

  if (await roleInput.count()) {
    await roleInput.fill('System Administrator');
    await descInput.fill('Duplicate test');
    await page.getByRole('button', { name: /^Save$/i }).click();
    await page.waitForTimeout(2000);
    const dupBody = await page.locator('body').innerText();
    console.log(
      'DUPLICATE VALIDATION:',
      dupBody
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => /required|already|duplicate|cannot|taken|exist|same/i.test(l))
    );
  }
} catch (error) {
  console.error('FAILED:', error.message);
  await page.screenshot({ path: 'inspect-error.png', fullPage: true });
} finally {
  await browser.close();
}

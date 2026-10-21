import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
    test('首頁載入並含主標', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { level: 1, name: /BNI 長輝白金分會/ })).toBeVisible();
    });

    test('會員頁可開啟', async ({ page }) => {
        await page.goto('/members');
        await expect(page).toHaveURL(/\/members/);
    });

    test('登入頁可開啟', async ({ page }) => {
        await page.goto('/login');
        await expect(page.getByRole('heading', { name: /會員登入/i })).toBeVisible();
    });

    test('引薦頁顯示 2026 新案例', async ({ page }) => {
        await page.goto('/referrals');
        await expect(page.getByRole('heading', { name: /引薦案例/ })).toBeVisible();
        await expect(page.getByText('空調工程 × 水電工程').first()).toBeVisible({ timeout: 20_000 });
        await expect(page.getByText('NT$1,050萬').first()).toBeVisible();
        await expect(page.getByText('團服第3次下單').first()).toBeVisible();
    });

    test('引薦頁桌面為三欄', async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto('/referrals');
        await expect(page.getByText('空調工程 × 水電工程').first()).toBeVisible({ timeout: 20_000 });
        const columns = await page.locator('[data-testid="referrals-grid"]').evaluate((el) => {
            return getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length;
        });
        expect(columns).toBe(3);
        const avatar = page.getByTestId('referral-avatar').first();
        await expect(avatar).toBeVisible();
        const box = await avatar.boundingBox();
        expect(box?.width ?? 0).toBeGreaterThanOrEqual(72);
    });

    test('引薦頁不露出客戶品牌名', async ({ page }) => {
        await page.goto('/referrals');
        await expect(page.getByText('空調工程 × 水電工程').first()).toBeVisible({ timeout: 20_000 });
        const body = await page.locator('body').innerText();
        for (const brand of ['聯華製粉', '再興小學', '弘第家具', '摩斯漢堡', '中越百花園', '亞洲生技展', '領袖鐵人', '領袖人']) {
            expect(body, brand).not.toContain(brand);
        }
    });
});

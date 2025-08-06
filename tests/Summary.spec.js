import { test, expect } from '@playwright/test';

// === 自訂 log 函式 ===
import { logResult } from './utils/logger.js';
const _TEST_NAME = '(首頁)';



// === 驗證功能選項是否存在 ===
async function verifyMenuItemVisible(page, locator, description) {
  try {
    await expect(locator).toBeVisible({ timeout: 2000 });
    // console.log(`✅ 成功顯示功能選項：「${description}」`);
    logResult(_TEST_NAME + `✅ 成功顯示功能選項：「${description}」`);
  } catch (error) {
    // console.log(`❌ 找不到功能選項：「${description}」`);
    logResult(_TEST_NAME + `❌ 找不到功能選項：「${description}」`);
    throw error;
  }
}



test('test', async ({ page }) => {

  // 原本操作流程
  await page.goto('https://web2023091801.azurewebsites.net/sso/Login');
  await page.getByRole('textbox', { name: '請輸入LDAP帳號' }).click();
  await page.getByRole('textbox', { name: '請輸入LDAP帳號' }).fill('ZA6369');
  await page.getByRole('button', { name: '送出' }).click();
  await page.getByRole('button', { name: '輔導改善平台' }).click();

  // 等待頁面穩定載入
  await page.waitForLoadState('networkidle');

  // 展開「個人作業」下拉選單
  const personalMenu = page.getByRole('link', { name: '個人作業' });
  await personalMenu.click();

  // 定義要驗證的功能項目
  const homeLink = page.locator('a.nav-link.text-white', { hasText: '首頁' });
  const pendingLink = page.locator('a.dropdown-item', { hasText: '個人待處理' });
  const tutorialLink = page.locator('a.dropdown-item', { hasText: '個人輔導作業' });

  // 執行驗證 : 驗證基本3功能是否存在
  await verifyMenuItemVisible(page, homeLink, '首頁');
  await verifyMenuItemVisible(page, pendingLink, '個人待處理');
  await verifyMenuItemVisible(page, tutorialLink, '個人輔導作業');

});
import { test, expect } from '@playwright/test';

// === 自訂 log 函式 ===
import { logResult } from './utils/logger.js'; 
logResult('\n' + `===== 測試 Summary.spec.js =====`);


// === 驗證特定文字存在於表格 ===
async function verifyTextExists(locator, expectedText) {
  try {
    await expect(locator).toContainText(expectedText, { timeout: 1000 });
    logResult(`✅ 成功找到指定輔導單號：${expectedText}`);
  } catch (error) {
    logResult(`❌ 找不到指定輔導單號：${expectedText}`);
    throw error;
  }
}


test('test', async ({ page }) => {
  await page.goto('https://web2023091801.azurewebsites.net/sso/Login');
  await page.getByRole('textbox', { name: '請輸入LDAP帳號' }).click();
  await page.getByRole('textbox', { name: '請輸入LDAP帳號' }).fill('ZA6369');
  await page.getByRole('button', { name: '送出' }).click();
  await page.getByRole('button', { name: '輔導改善平台' }).click();
});
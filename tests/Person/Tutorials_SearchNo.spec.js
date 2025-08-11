import { test } from '@playwright/test';
import { verifyRowCount, setDefaultTestName } from '../utils/verifications.js';



const _TEST_NAME = '(個人輔導作業「查詢輔導單號」)';
setDefaultTestName(_TEST_NAME);



test('test', async ({ page }) => {

  // 登入與導航流程
  await page.goto('https://web2023091801.azurewebsites.net/sso/Login');
  await page.getByRole('textbox', { name: '請輸入LDAP帳號' }).fill('ZA6369');
  await page.getByRole('button', { name: '送出' }).click();
  await page.getByRole('button', { name: '輔導改善平台' }).click();
  await page.getByRole('link', { name: '個人作業' }).hover();
  await page.waitForTimeout(200); // 展開選單
  await page.getByRole('link', { name: '個人輔導作業' }).click();
  await page.waitForTimeout(1000); // 停一停等測試頁渲染完成

  // 設定查詢條件
  await page.getByLabel('建單日期').selectOption('5');
  await page.locator('#startDate').fill('2025-04-01');
  await page.locator('#endDate').fill('2025-04-30');
  await page.getByRole('textbox', { name: '輔導單號 :' }).fill('0250421');
  await page.getByRole('button', { name: '搜尋' }).click();

  // 等待至少一筆表格資料出現
  await page.waitForSelector('table tbody tr', { state: 'attached' });

  // 驗證資料
  const trLocator = page.locator('table tbody tr');
  await verifyRowCount(trLocator, 4);  // 驗證筆數

  // const count = await rowLocator.count();
  // logResult(`${_TEST_NAME}✅ 表格列數為 ${count} 筆`);
});

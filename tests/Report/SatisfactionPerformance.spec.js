import { test, expect } from '@playwright/test';

// === 自訂 log 函式 ===
import { logResult } from '../utils/logger.js'; 

// === 驗證表格列數量 ===
async function verifyRowCount(locator, expectedCount) {
  try {
    await expect(locator).toHaveCount(expectedCount, { timeout: 1000 });
    logResult(`✅ 表格列數驗證通過：預期 ${expectedCount} 筆，實際相符。`);
  } catch (error) {
    logResult(`❌ 表格列數錯誤：預期 ${expectedCount} 筆，但不符。`);
    throw error;
  }
}

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

  // 只攔截查詢報表的 POST 請求
  await page.route('**/Report/SatisfactionPerformance', async (route, request) => {
    if (request.method() !== 'POST' || request.resourceType() !== 'xhr') {
      return route.continue();
    }

    const originalPostData = request.postData() || '';
    const params = new URLSearchParams(originalPostData);

    params.set('StartDate', '2025/04/01');
    params.set('EndDate', '2025/04/30');

    await route.continue({
      method: 'POST',
      postData: params.toString(),
      headers: {
        ...request.headers(),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  });


  // 原本操作流程
  await page.goto('https://web2023091801.azurewebsites.net/sso/Login');
  await page.getByRole('textbox', { name: '請輸入LDAP帳號' }).click();
  await page.getByRole('textbox', { name: '請輸入LDAP帳號' }).fill('ZA6369');
  await page.getByRole('button', { name: '送出' }).click();
  await page.getByRole('button', { name: '輔導改善平台' }).click();
  await page.getByRole('link', { name: '相關報表' }).hover(); // mouse-move-on showing function list.
  await page.waitForTimeout(200); // wait 0.2 sec. for displaying list
  await page.getByRole('link', { name: '客戶滿意度查訪績效月報表' }).click();
  // await page.getByLabel('中心').selectOption('23');
  await page.locator('#ddlDateRange').selectOption('Custom');
  await page.getByRole('button', { name: '查詢' }).click();


  // 等待資料 API 回應成功
  await page.waitForResponse(response =>
  response.url().includes('/Report/SatisfactionPerformance') &&
  response.status() === 200
  );

    // === 執行驗證 ===
  const rows = page.locator('#perfTable tbody tr');
  const table = page.locator('#perfTable');
  await verifyRowCount(rows, 19);
  await verifyTextExists(table, '20250407-WISDOM-000001');
});
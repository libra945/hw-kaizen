import { test } from '@playwright/test';
import { verifyRowCount, verifyTextExists, setDefaultTestName } from '../utils/verifications.js';



const _TEST_NAME = '(滿意度查訪績效月報)';
const _TEST_PATH = '/Report/SatisfactionPerformance';
setDefaultTestName(_TEST_NAME);



test('test', async ({ page }) => {

  // 只攔截查詢報表的 POST 請求
  await page.route('**' + _TEST_PATH, async (route, request) => {
    if (request.method() !== 'POST' || request.resourceType() !== 'xhr') {
      return route.continue();
    }

    const originalPostData = request.postData() || '';
    const params = new URLSearchParams(originalPostData);

    params.set('StartDate', '2025/04/01');
    params.set('EndDate', '2025/05/31');

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
  response.url().includes( _TEST_PATH ) &&
  response.status() === 200
  );
  

  // 驗證資料
  const trLocator = page.locator('#perfTable tbody tr');
  await verifyRowCount(trLocator, 2);  // 驗證筆數
  const tableLocator = page.locator('#perfTable');
  await verifyTextExists(tableLocator, '20250430-WISDOM-000221');  // 驗證內容
});
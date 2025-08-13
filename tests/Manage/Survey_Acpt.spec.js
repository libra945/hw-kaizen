import { test } from '@playwright/test';
import { _GENERAL_WAIT_MS } from '../utils/constants.js';
import { verifyRowCount, verifyTextExists, verifyTextArrayExists, setDefaultTestName } from '../utils/verifications.js';



const _TEST_NAME = '(輔導單總覽「增加條件-驗收項目」)';
setDefaultTestName(_TEST_NAME);



test('test', async ({ page }) => {

  // 登入與導航流程
  await page.goto('https://web2023091801.azurewebsites.net/sso/Login');
  await page.getByRole('textbox', { name: '請輸入LDAP帳號' }).click();
  await page.getByRole('textbox', { name: '請輸入LDAP帳號' }).fill('ZA6369');
  await page.getByRole('button', { name: '送出' }).click();
  await page.getByRole('button', { name: '輔導改善平台' }).click();
  await page.getByRole('link', { name: '管理作業' }).hover();
  await page.getByRole('link', { name: '輔導單總覽' }).click();
  await page.waitForTimeout(_GENERAL_WAIT_MS); // 停一停等測試頁渲染完成

  // 設定查詢條件
  await page.getByLabel('建單日期').selectOption('5');
  await page.locator('#startDate').fill('2025-04-01');
  await page.locator('#endDate').fill('2025-04-30');

  await page.getByLabel('單位').selectOption('ALL');
  await page.getByRole('button', { name: '設定' }).click();
  await page.getByRole('checkbox', { name: '驗收項目' }).check();
  await page.getByRole('button', { name: '完成' }).click();
  await page.locator('#AddSearchForm').getByRole('combobox', { name: 'items selected' }).click();
  await page.getByRole('option', { name: '✓ 不列入驗收' }).click();
  await page.getByRole('button', { name: '搜尋' }).click();

  // 等待至少一筆表格資料出現
  await page.waitForSelector('table tbody tr', { state: 'attached' });

  // 驗證表頭
  const thLocator = page.locator('table thead th');
  const expectedHeaders = [
    '單號', '類型', '處理方式', '姓名', '員工代號', '輔導者',
    '進線時間', 'CS1', 'CS2', 'CS3', '改善期限', '目前流程', '驗收狀態'
  ];
  await verifyTextArrayExists(thLocator, expectedHeaders);

  // 驗證資料
  const trLocator = page.locator('table tbody tr');
  await verifyRowCount(trLocator, 1);  // 驗證筆數
  await verifyTextExists(trLocator, '列入驗收');  // 驗證內容
});
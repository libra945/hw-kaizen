// === 自訂 log 函式 ===
import { expect } from '@playwright/test';
// === 自訂 log 函式 ===
import { logResult } from '../utils/logger.js';
const _TEST_NAME = '(績效欠佳改善措施月報)';
const _TEST_PATH = '/Report/SatisfactionImprovement';

// === 驗證表格列數量 ===
async function verifyRowCount(locator, expectedCount) {
  try {
    await expect(locator).toHaveCount(expectedCount, { timeout: 1000 });
    logResult(_TEST_NAME + `✅ 表格列數驗證通過：預期 ${expectedCount} 筆，實際相符。`);
  } catch (error) {
    logResult(_TEST_NAME + `❌ 表格列數錯誤：預期 ${expectedCount} 筆，但不符。`);
    throw error;
  }
}

// === 驗證特定文字存在於表格 ===
async function verifyTextExists(locator, expectedText) {
  try {
    await expect(locator).toContainText(expectedText, { timeout: 1000 });
    logResult(_TEST_NAME + `✅ 成功找到指定受輔導者：${expectedText}`);
  } catch (error) {
    logResult(_TEST_NAME + `❌ 找不到指定受輔導者：${expectedText}`);
    throw error;
  }
}

// 匯出共用函式
export { logResult };
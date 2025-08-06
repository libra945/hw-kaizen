import { expect } from '@playwright/test';
import { logResult } from '../utils/logger.js';



let defaultTestName = '';
export function setDefaultTestName(testName) {
  defaultTestName = testName;
}



// === 驗證表格列數量 ===
async function verifyRowCount(locator, expectedCount) {
  try {
    await expect(locator).toHaveCount(expectedCount, { timeout: 1000 });
    logResult(defaultTestName + `✅ 表格列數驗證通過：預期 ${expectedCount} 筆，實際相符。`);
  } catch (error) {
    logResult(defaultTestName + `❌ 表格列數錯誤：預期 ${expectedCount} 筆，但不符。`);
    throw error;
  }
}



// === 驗證特定文字存在於表格 ===
async function verifyTextExists(locator, expectedText) {
  try {
    await expect(locator).toContainText(expectedText, { timeout: 1000 });
    logResult(defaultTestName + `✅ 成功找到指定文字：${expectedText}`);
  } catch (error) {
    logResult(defaultTestName + `❌ 找不到指定文字：${expectedText}`);
    throw error;
  }
}

// 匯出共用函式
export { verifyRowCount, verifyTextExists };
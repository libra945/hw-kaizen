import { expect } from '@playwright/test';
import { logResult } from '../utils/logger.js';



// 驗證相關的超時設定，你可以依需求調整
const _VERIFY_TIMEOUT = 5000; // 統一設定為 5 秒

// 初始化 測試的項目名稱，用在輸出到 log檔
let defaultTestName = '';
export function setDefaultTestName(testName) {
  defaultTestName = testName;
}



// === 驗證表格列數量 ===
async function verifyRowCount(locator, expectedCount) {
  try {
    await expect(locator).toHaveCount(expectedCount, { timeout: _VERIFY_TIMEOUT });
    logResult(defaultTestName + `✅ 表格列數驗證通過：預期 ${expectedCount} 筆，實際相符。`);
  } catch (error) {
    logResult(defaultTestName + `❌ 表格列數錯誤：預期 ${expectedCount} 筆，但不符。`);
    throw error;
  }
}



// === 驗證特定文字存在於表格 ===
async function verifyTextExists(locator, expectedText) {
  try {

    // 透過 filter 篩選出包含指定文字的元素
    const filteredLocator = locator.filter({ hasText: expectedText });

    // 斷言篩選後的 locator 至少要存在一個元素
    await expect(filteredLocator).toHaveCount(1, { timeout: _VERIFY_TIMEOUT });

    // 寫 log
    logResult(defaultTestName + `✅ 成功找到指定文字：${expectedText}`);
  } catch (error) {
    logResult(defaultTestName + `❌ 找不到指定文字：${expectedText}`);
    throw error;
  }
}

// 匯出共用函式
export { verifyRowCount, verifyTextExists };
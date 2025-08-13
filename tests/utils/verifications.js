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



/**
 * === 驗證特定文字存在於表格 ===
 * 斷言指定定位器 (locator) 下的所有元素文字內容，
 * 存在至少1個 預期的字串 (expectedText)。
 *
 * @param {Locator} locator - Playwright 的定位器，例如 page.locator('table tbody tr')
 * @param {string} expectedText - 預期字串
 */
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



/**
 * === 驗證定位器內的文字陣列 ===
 * 斷言指定定位器 (locator) 下的所有元素文字內容，
 * 與預期的文字陣列 (expectedHeaders) 完全相符 (數量與順序皆須符合)。
 *
 * @param {Locator} locator - Playwright 的定位器，例如 page.locator('th')
 * @param {string[]} expectedHeaders - 預期文字的字串陣列
 */
async function verifyTextArrayExists(locator, expectedHeaders) {
  try {
    // 使用 toHaveText 進行斷言，它會檢查 locator 找到的所有元素，
    // 其文字內容必須依序且完全等於 expectedHeaders 陣列中的內容。
    // 這是一個嚴格的比對。
    await expect(locator).toHaveText(expectedHeaders, { timeout: _VERIFY_TIMEOUT });

    // 將陣列轉換為字串以便日誌輸出
    const headersString = JSON.stringify(expectedHeaders);
    
    // 寫入成功的 log
    logResult(defaultTestName + `✅ 成功驗證文字清單：${headersString}`);
  } catch (error) {
    const headersString = JSON.stringify(expectedHeaders);

    // 寫入失敗的 log
    // Playwright 的錯誤訊息通常已足夠詳細 (會顯示預期值和實際值)，
    // 所以這裡的 log 主要是為了格式統一。
    logResult(defaultTestName + `❌ 驗證文字清單失敗。預期為：${headersString}`);
    
    // 將原始錯誤向上拋出，這樣測試才會被標記為失敗
    throw error;
  }
}



// 匯出共用函式
export { verifyRowCount, verifyTextExists, verifyTextArrayExists };
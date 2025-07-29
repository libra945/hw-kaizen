// === 自訂 log 函式 ===
import fs from 'fs';
import path from 'path';

const logDir = 'test-logs';
const logFile = path.join(logDir, 'test-log.txt');

// 建立 log 資料夾（若尚未存在）
function logResult(message) {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(logFile, logMessage + '\n');
}

// 匯出共用函式
export { logResult };
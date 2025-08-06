module.exports = {
  // 設定測試超時為 5 秒
  timeout: 5000,
  
  use: {
    actionTimeout: 5000,
    navigationTimeout: 5000,
  },
  
  expect: {
    timeout: 5000
  },
  
  // 其他預設設定
  testDir: './tests',
  fullyParallel: true,
  // reporter: 'html',
};
module.exports = {
  // 設定測試超時為 10 秒
  timeout: 10000,
  
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
  workers: 3, 
  // reporter: 'html',
};
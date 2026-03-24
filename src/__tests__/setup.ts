// Jest 测试设置文件

// Mock axios for testing
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  })),
}));

// 设置测试超时时间
jest.setTimeout(10000);

// 全局测试配置
globalThis.console = {
  ...console,
  // 在测试中禁用某些日志输出
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: console.warn,
  error: console.error,
};
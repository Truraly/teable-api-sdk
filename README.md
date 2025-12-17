# Teable API SDK

一个用于 Teable API 的 TypeScript 客户端 SDK，提供了完整的功能来与 Teable 数据库和电子表格进行交互。

## 特性

- 🚀 TypeScript 支持，完整的类型定义
- ✅ 基于 Zod 的数据验证
- 🔄 Promise 支持，支持 async/await
- 🛡️ 内置错误处理和拦截器
- 📦 支持 CommonJS、ES Module 和 UMD
- 🧪 完整的测试覆盖
- 📝 详细的文档和示例

## 安装

```bash
npm install @teble/api-sdk
# 或者
yarn add @teble/api-sdk
# 或者
pnpm add @teble/api-sdk
```

## 快速开始

```typescript
import { createTeableClient } from '@teble/api-sdk';

// 创建客户端实例
const client = createTeableClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://your-teable-instance.com',
});

// 获取记录
const result = await client.record.get({
  tableId: 'your-table-id',
  take: 10
});

if (result.success) {
  console.log('获取到的记录:', result.data.records);
} else {
  console.error('获取失败:', result.error);
}
```

## API 文档

### 创建客户端

```typescript
import { createTeableClient } from '@teble/api-sdk';

const client = createTeableClient({
  apiKey: string;        // API 密钥（必需）
  baseUrl: string;       // Teable 服务器基础 URL（必需）
  databaseId?: string;   // 数据库 ID（可选）
  diaryTableId?: string; // 日记表 ID（可选）
});
```

### 记录操作

#### 创建记录

```typescript
const result = await client.record.create({
  tableId: 'table-id',
  records: [
    {
      fields: {
        '字段名1': '值1',
        '字段名2': 123,
        '字段名3': ['选择值1', '选择值2']
      }
    }
  ],
  fieldKeyType?: 'name' | 'id' | 'dbFieldName', // 可选，默认 'name'
  typecast?: boolean, // 可选，是否自动类型转换
  order?: { // 可选，记录排序
    viewId: 'view-id',
    anchorId: 'anchor-record-id',
    position: 'before' | 'after'
  }
});
```

#### 获取记录

```typescript
// 获取记录列表
const result = await client.record.get({
  tableId: 'table-id',
  viewId?: 'view-id', // 可选
  take?: 100, // 可选，最大 1000
  skip?: 0, // 可选，用于分页
  fieldKeyType?: 'name' | 'id' | 'dbFieldName', // 可选，默认 'name'
  cellFormat?: 'json' | 'text', // 可选，默认 'json'
  projection?: ['字段1', '字段2'], // 可选，指定返回字段
  orderBy?: [{ // 可选，排序
    field: '字段名',
    order: 'asc' | 'desc'
  }],
  filter?: { /* 筛选条件 */ }, // 可选
  search?: [{ // 可选，搜索条件
    field: '字段名',
    value: '搜索值'
  }]
});

// 获取单个记录
const result = await client.record.getById({
  tableId: 'table-id',
  recordId: 'record-id',
  projection?: ['字段1', '字段2'], // 可选
  cellFormat?: 'json' | 'text', // 可选
  fieldKeyType?: 'name' | 'id' | 'dbFieldName' // 可选
});

// 别名方法 list
const result = await client.record.list({
  tableId: 'table-id',
  take: 10
});
```

#### 更新记录

```typescript
const result = await client.record.update({
  tableId: 'table-id',
  recordId: 'record-id',
  record: {
    fields: {
      '字段名1': '新值',
      '字段名2': 456
    }
  },
  fieldKeyType?: 'name' | 'id' | 'dbFieldName', // 可选，默认 'name'
  typecast?: boolean, // 可选，是否自动类型转换
  order?: { // 可选，记录排序
    viewId: 'view-id',
    anchorId: 'anchor-record-id',
    position: 'before' | 'after'
  }
});
```

#### 删除记录

```typescript
const result = await client.record.delete({
  tableId: 'table-id',
  recordId: 'record-id'
});
```

#### 上传附件

```typescript
const fileInput = document.getElementById('file-input') as HTMLInputElement;
const file = fileInput.files[0];

const result = await client.record.uploadAttachment({
  tableId: 'table-id',
  recordId: 'record-id',
  fieldId: 'attachment-field-id',
  file: file,
  fileUrl?: 'optional-file-url' // 可选，作为 file 的替代
});
```

## 错误处理

SDK 使用统一的响应格式和错误处理：

```typescript
interface TeableResponse<T = any> {
  success: boolean;     // 操作是否成功
  data?: T;            // 响应数据
  error?: string;      // 错误信息
  message?: string;    // 消息
}

// 使用示例
const result = await client.record.get({ tableId: 'table-id' });

if (result.success) {
  // 成功处理
  console.log('数据:', result.data);
} else {
  // 错误处理
  console.error('错误:', result.error);
}
```

## 配置验证

SDK 提供了配置验证功能：

```typescript
const client = createTeableClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://your-teable-instance.com'
});

// 验证配置
if (client.validateConfig()) {
  console.log('配置有效');
} else {
  console.error('配置无效');
}
```

## 浏览器使用

在浏览器中使用时，可以直接引入 UMD 版本：

```html
<script src="https://unpkg.com/@teble/api-sdk/dist/index.umd.js"></script>
<script>
  const { createTeableClient } = TeableSDK;

  const client = createTeableClient({
    apiKey: 'your-api-key',
    baseUrl: 'https://your-teable-instance.com'
  });
</script>
```

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 修复代码
npm run lint:fix

# 测试
npm test

# 清理构建文件
npm run clean
```

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
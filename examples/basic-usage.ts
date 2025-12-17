/**
 * Teable API SDK 基本使用示例
 */

import { createTeableClient, TeableConfig } from '../src';

// 配置 Teable 客户端
const config: TeableConfig = {
  apiKey: process.env.TEABLE_API_KEY || 'your-api-key',
  baseUrl: process.env.TEABLE_BASE_URL || 'https://your-teable-instance.com',
};

// 创建客户端实例
const client = createTeableClient(config);

async function basicUsageExample() {
  try {
    console.log('开始基本使用示例...');

    // 验证配置
    if (!client.validateConfig()) {
      console.error('配置验证失败，请检查 apiKey 和 baseUrl');
      return;
    }

    console.log('配置验证通过');

    // 示例：创建记录
    console.log('\n--- 创建记录示例 ---');
    const createResult = await client.record.create({
      tableId: 'your-table-id',
      records: [
        {
          fields: {
            '姓名': '张三',
            '年龄': 25,
            '邮箱': 'zhangsan@example.com',
            '状态': '活跃'
          },
        },
      ],
    });

    if (createResult.success) {
      console.log('创建成功:', createResult.data.records);
    } else {
      console.error('创建失败:', createResult.error);
    }

    // 示例：获取记录列表
    console.log('\n--- 获取记录列表示例 ---');
    const getListResult = await client.record.get({
      tableId: 'your-table-id',
      take: 10,
      orderBy: [
        {
          field: '创建时间',
          order: 'desc',
        },
      ],
    });

    if (getListResult.success) {
      console.log(`获取到 ${getListResult.data?.records?.length || 0} 条记录`);
      console.log('记录列表:', getListResult.data?.records);
    } else {
      console.error('获取失败:', getListResult.error);
    }

    // 示例：获取单个记录
    if (createResult.success && createResult.data.records.length > 0) {
      console.log('\n--- 获取单个记录示例 ---');
      const recordId = createResult.data.records[0].id;

      if (recordId) {
        const getResult = await client.record.getById({
          tableId: 'your-table-id',
          recordId: recordId,
          projection: ['姓名', '邮箱', '状态'],
        });

        if (getResult.success) {
          console.log('获取单个记录成功:', getResult.data);
        } else {
          console.error('获取单个记录失败:', getResult.error);
        }
      }
    }

    // 示例：更新记录
    if (createResult.success && createResult.data.records.length > 0) {
      console.log('\n--- 更新记录示例 ---');
      const recordId = createResult.data.records[0].id;

      if (recordId) {
        const updateResult = await client.record.update({
          tableId: 'your-table-id',
          recordId: recordId,
          record: {
            fields: {
              '年龄': 26,
              '状态': '已更新'
            },
          },
        });

        if (updateResult.success) {
          console.log('更新成功:', updateResult.data);
        } else {
          console.error('更新失败:', updateResult.error);
        }
      }
    }

    // 示例：删除记录
    if (createResult.success && createResult.data.records.length > 0) {
      console.log('\n--- 删除记录示例 ---');
      const recordId = createResult.data.records[0].id;

      if (recordId) {
        const deleteResult = await client.record.delete({
          tableId: 'your-table-id',
          recordId: recordId,
        });

        if (deleteResult.success) {
          console.log('删除成功');
        } else {
          console.error('删除失败:', deleteResult.error);
        }
      }
    }

  } catch (error) {
    console.error('示例执行出错:', error instanceof Error ? error.message : error);
  }
}

// 错误处理示例
async function errorHandlingExample() {
  try {
    console.log('\n=== 错误处理示例 ===');

    // 故意使用错误的配置
    const invalidClient = createTeableClient({
      apiKey: 'invalid-key',
      baseUrl: 'https://invalid-url.com',
    });

    const result = await invalidClient.record.get({
      tableId: 'invalid-table-id',
    });

    if (!result.success) {
      console.log('捕获到预期的错误:', result.error);
    }

  } catch (error) {
    console.log('捕获到异常:', error instanceof Error ? error.message : error);
  }
}

// 运行示例
async function runExamples() {
  console.log('Teable API SDK 使用示例');
  console.log('========================');

  await basicUsageExample();
  await errorHandlingExample();

  console.log('\n示例执行完成');
}

// 如果直接运行此文件，则执行示例
if (require.main === module) {
  runExamples().catch(console.error);
}

export { basicUsageExample, errorHandlingExample, runExamples };
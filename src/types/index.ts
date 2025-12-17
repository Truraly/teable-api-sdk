/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Teable SDK 配置
 */
export interface TeableConfig {
  /** API 密钥 */
  apiKey: string;
  /** Teable 服务器基础 URL */
  baseUrl: string;
  /** 数据库 ID（可选） */
  databaseId?: string;
  /** 日记表 ID（可选） */
  diaryTableId?: string;
}

/**
 * 表记录
 */
export interface TableRecord {
  /** 记录 ID */
  id?: string;
  /** 字段数据 */
  fields: Record<string, any>;
  /** 创建时间 */
  createdTime?: string;
  /** 更新时间 */
  updatedTime?: string;
}

/**
 * 字段键类型
 * - "name": 使用字段名作为键
 * - "id": 使用字段 ID 作为键
 * - "dbFieldName": 使用字段 dbFieldName 作为键
 */
export type FieldKeyType = "name" | "id" | "dbFieldName";

/**
 * 记录排序位置
 * - "before": 在锚点记录之前
 * - "after": 在锚点记录之后
 */
export type RecordPosition = "before" | "after";

/**
 * 记录排序配置
 */
export interface RecordOrder {
  /** 视图 ID */
  viewId: string;
  /** 锚点记录 ID */
  anchorId: string;
  /** 相对于锚点记录的位置 */
  position: RecordPosition;
}

/**
 * 单元格格式
 * - "json": 返回结构化的 JSON 数据（默认）
 * - "text": 返回纯文本格式
 */
export type CellFormat = "json" | "text";

/**
 * 排序对象
 */
export interface SortObject {
  /** 字段名称或 ID（取决于 fieldKeyType） */
  fieldId: string;
  /** 排序方向 */
  order: "asc" | "desc";
}

/**
 * 搜索条件
 */
export interface SearchCondition {
  /** 字段名称或 ID（取决于 fieldKeyType） */
  field: string;
  /** 搜索值 */
  value: string;
}

/**
 * Teable API 响应
 */
export interface TeableResponse<T = any> {
  /** 操作是否成功 */
  success: boolean;
  /** 响应数据 */
  data?: T;
  /** 错误信息 */
  error?: string;
  /** 消息 */
  message?: string;
}
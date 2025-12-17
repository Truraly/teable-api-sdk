/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FieldKeyType,
  RecordOrder,
  CellFormat,
  SortObject,
  SearchCondition,
  TableRecord,
} from "../types";

export * from "../types";

/**
 * 创建记录选项
 */
export interface RecordCreateOptions {
  /** 表 ID */
  tableId: string;
  /** 要创建的记录数组 */
  records: Array<{
    /** 字段数据，每个字段的值结构根据字段类型而不同 */
    fields: Record<string, any>;
  }>;
  /**
   * 字段键类型（可选）
   * @default "name"
   */
  fieldKeyType?: FieldKeyType;
  /**
   * 是否自动转换字段值类型（可选）
   * 如果设置为 true，系统会尝试将输入值转换为正确的字段值类型
   * @default false
   */
  typecast?: boolean;
  /**
   * 记录排序配置（可选）
   * 指定新记录在指定视图中的位置
   */
  order?: RecordOrder;
}

/**
 * 创建记录响应
 */
export interface RecordCreateResponse {
  /** 创建的记录数组 */
  records: TableRecord[];
}

/**
 * 获取记录选项
 */
export interface RecordGetOptions {
  /** 表 ID */
  tableId: string;
  /**
   * 视图 ID（可选）
   * 如果未指定，会按照创建时间来返回记录的顺序，并且返回所有记录和字段
   */
  viewId?: string;
  /**
   * 获取的记录数量（可选）
   * @default undefined
   * @maximum 1000
   */
  take?: number;
  /**
   * 跳过的记录数量（可选）
   * 用于分页
   * @default undefined
   */
  skip?: number;
  /**
   * 字段键类型（可选）
   * @default "name"
   */
  fieldKeyType?: FieldKeyType;
  /**
   * 单元格返回值格式（可选）
   * @default "json"
   */
  cellFormat?: CellFormat;
  /**
   * 指定要获取的字段（可选）
   * 如果不指定，将获取所有可见字段
   * 参数值取决于 fieldKeyType 设置
   */
  projection?: string[];
  /**
   * 排序方式（可选）
   * 排序对象数组
   */
  orderBy?: SortObject[];
  /**
   * 筛选条件（可选）
   * 用于筛选结果的复杂查询条件对象
   */
  filter?: Record<string, any>;
  /**
   * 搜索条件（可选）
   * 搜索匹配指定字段和值的记录
   */
  search?: SearchCondition[];
}

/**
 * 获取记录响应
 */
export interface RecordGetResponse {
  /** 记录数组 */
  records: TableRecord[];
  /** 偏移量（用于分页） */
  offset?: string;
}

/**
 * 获取单个记录选项
 */
export interface RecordGetByIdOptions {
  /** 表 ID */
  tableId: string;
  /** 记录 ID */
  recordId: string;
  /**
   * 指定要获取的字段（可选）
   * 如果不指定，将获取所有可见字段
   * 参数值取决于 fieldKeyType 设置
   */
  projection?: string[];
  /**
   * 单元格返回值格式（可选）
   * @default "json"
   */
  cellFormat?: CellFormat;
  /**
   * 字段键类型（可选）
   * @default "name"
   */
  fieldKeyType?: FieldKeyType;
}

/**
 * 获取单个记录响应
 */
export interface RecordGetByIdResponse {
  /** 记录 ID */
  id: string;
  /** 字段数据 */
  fields: Record<string, any>;
  /** 主字段值 */
  name: string;
  /** 自增编号 */
  autoNumber: number;
  /** 创建时间 */
  createdTime: string;
  /** 最后修改时间 */
  lastModifiedTime: string;
  /** 创建者 */
  createdBy: string;
  /** 最后修改者 */
  lastModifiedBy: string;
  /** 权限信息 */
  permissions: Record<string, any>;
  /** 是否不可删除 */
  undeletable: boolean;
}

/**
 * 更新记录选项
 */
export interface RecordUpdateOptions {
  /** 表 ID */
  tableId: string;
  /** 记录 ID */
  recordId: string;
  /** 记录数据 */
  record: {
    /** 字段数据，每个字段的值结构根据字段类型而不同 */
    fields: Record<string, any>;
  };
  /**
   * 字段键类型（可选）
   * @default "name"
   */
  fieldKeyType?: FieldKeyType;
  /**
   * 是否自动转换字段值类型（可选）
   * 如果设置为 true，系统会尝试将输入值转换为正确的字段值类型
   * @default false
   */
  typecast?: boolean;
  /**
   * 记录排序配置（可选）
   * 指定新记录在指定视图中的位置
   */
  order?: RecordOrder;
}

/**
 * 更新记录响应
 */
export interface RecordUpdateResponse {
  /** 记录 ID */
  id: string;
  /** 字段数据 */
  fields: Record<string, any>;
  /** 主字段值 */
  name: string;
  /** 自增编号 */
  autoNumber: number;
  /** 创建时间 */
  createdTime: string;
  /** 最后修改时间 */
  lastModifiedTime: string;
  /** 创建者 */
  createdBy: string;
  /** 最后修改者 */
  lastModifiedBy: string;
  /** 权限信息 */
  permissions: Record<string, any>;
  /** 是否不可删除 */
  undeletable: boolean;
}

/**
 * 删除记录选项
 */
export interface RecordDeleteOptions {
  /** 表 ID */
  tableId: string;
  /** 记录 ID */
  recordId: string;
}

/**
 * 删除记录响应
 */
export interface RecordDeleteResponse {
  /** 是否删除成功 */
  success: boolean;
}

/**
 * 上传附件选项
 */
export interface RecordUploadAttachmentOptions {
  /** 表 ID */
  tableId: string;
  /** 记录 ID */
  recordId: string;
  /** 附件字段 ID */
  fieldId: string;
  /** 要上传的文件 */
  file: File;
  /** 文件 URL（可选，作为 file 的替代） */
  fileUrl?: string;
}

/**
 * 上传附件响应
 */
export interface RecordUploadAttachmentResponse {
  /** 记录 ID */
  id: string;
  /** 字段数据 */
  fields: Record<string, any>;
  /** 主字段值 */
  name: string;
  /** 自增编号 */
  autoNumber: number;
  /** 创建时间 */
  createdTime: string;
  /** 最后修改时间 */
  lastModifiedTime: string;
  /** 创建者 */
  createdBy: string;
  /** 最后修改者 */
  lastModifiedBy: string;
  /** 权限信息 */
  permissions: Record<string, any>;
  /** 是否不可删除 */
  undeletable: boolean;
}
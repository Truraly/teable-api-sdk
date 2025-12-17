import axios from "axios";
import type {
  TeableConfig,
  TableRecord,
  TeableResponse,
  FieldKeyType,
  RecordOrder,
  RecordPosition,
  CellFormat,
  SortObject,
  SearchCondition,
} from "./types";
import type {
  RecordCreateOptions,
  RecordCreateResponse,
  RecordGetOptions,
  RecordGetResponse,
  RecordGetByIdOptions,
  RecordGetByIdResponse,
  RecordUpdateOptions,
  RecordUpdateResponse,
  RecordDeleteOptions,
  RecordDeleteResponse,
  RecordUploadAttachmentOptions,
  RecordUploadAttachmentResponse,
} from "./record/types";
import getRecordApis from "./record";

/**
 * 创建 Teable 客户端
 * @param config - Teable 配置
 */
export function createTeableClient(config: TeableConfig) {
  const client = axios.create({
    baseURL: config.baseUrl,
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  // 添加响应拦截器用于错误处理
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.message;

        if (status === 401) {
          throw new Error("API密钥无效或已过期");
        } else if (status === 403) {
          throw new Error("权限不足，无法访问指定的资源");
        } else if (status === 404) {
          throw new Error("请求的资源不存在");
        } else if (status >= 500) {
          throw new Error(`服务器错误 (${status}): ${message}`);
        } else {
          throw new Error(`请求失败 (${status}): ${message}`);
        }
      } else if (error.request) {
        throw new Error("无法连接到Teable服务器，请检查网络连接和服务器状态");
      } else {
        throw new Error(`请求配置错误: ${error.message}`);
      }
    }
  );

  return {
    record: getRecordApis(client),
    /**
     * 验证配置是否有效
     */
    validateConfig: () => !!(config.apiKey && config.baseUrl),
  };
}

export type TeableClient = {
  record: {
    create: (options: RecordCreateOptions) => Promise<TeableResponse<RecordCreateResponse>>;
    get: (options: RecordGetOptions) => Promise<TeableResponse<RecordGetResponse>>;
    getById: (options: RecordGetByIdOptions) => Promise<TeableResponse<RecordGetByIdResponse>>;
    update: (options: RecordUpdateOptions) => Promise<TeableResponse<RecordUpdateResponse>>;
    delete: (options: RecordDeleteOptions) => Promise<TeableResponse<RecordDeleteResponse>>;
    uploadAttachment: (options: RecordUploadAttachmentOptions) => Promise<TeableResponse<RecordUploadAttachmentResponse>>;
    list: (options: Omit<RecordGetOptions, 'viewId'>) => Promise<TeableResponse<RecordGetResponse>>;
  };
  validateConfig: () => boolean;
};

// 导出类型
export type {
  TeableConfig,
  TableRecord,
  RecordCreateOptions,
  RecordCreateResponse,
  RecordGetOptions,
  RecordGetResponse,
  RecordGetByIdOptions,
  RecordGetByIdResponse,
  RecordUpdateOptions,
  RecordUpdateResponse,
  RecordDeleteOptions,
  RecordDeleteResponse,
  RecordUploadAttachmentOptions,
  RecordUploadAttachmentResponse,
  TeableResponse,
  FieldKeyType,
  RecordPosition,
  RecordOrder,
  CellFormat,
  SortObject,
  SearchCondition,
};

// 导出版本信息
export const version = "1.0.0";

// 默认导出
export default {
  createTeableClient,
  version,
};
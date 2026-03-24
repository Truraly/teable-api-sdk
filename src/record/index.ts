import { AxiosInstance } from "axios";
import {
  FieldKeyType,
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
  RecordOrder,
  TeableResponse,
} from "./types";
import {
  RecordCreateSchema,
  RecordGetSchema,
  RecordGetByIdSchema,
  RecordUpdateSchema,
  RecordDeleteSchema,
  RecordUploadAttachmentSchema,
} from "./schema";
import z from "zod";

export default function getRecordApis(client: AxiosInstance) {
  return {
    async create(
      options: RecordCreateOptions,
    ): Promise<TeableResponse<RecordCreateResponse>> {
      try {
        // 验证请求数据
        const validatedData = RecordCreateSchema.parse(options);

        // 构建请求体
        const requestBody: {
          records: Array<{ fields: Record<string, any> }>;
          fieldKeyType?: FieldKeyType;
          typecast?: boolean;
          order?: RecordOrder;
        } = {
          records: validatedData.records,
        };

        // 添加可选参数
        if (validatedData.fieldKeyType) {
          requestBody.fieldKeyType = validatedData.fieldKeyType;
        }
        if (validatedData.typecast !== undefined) {
          requestBody.typecast = validatedData.typecast;
        }
        if (validatedData.order) {
          requestBody.order = validatedData.order;
        }

        // 发送 POST 请求
        const response = await client.post<RecordCreateResponse>(
          `/api/table/${validatedData.tableId}/record`,
          requestBody,
        );

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        // 处理 Zod 验证错误
        if (error instanceof z.ZodError) {
          const errorMessages = error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ");
          return {
            success: false,
            error: `数据验证失败: ${errorMessages}`,
          };
        }

        // 处理其他错误
        return {
          success: false,
          error: error instanceof Error ? error.message : "创建记录失败",
        };
      }
    },

    async get(
      options: RecordGetOptions,
    ): Promise<TeableResponse<RecordGetResponse>> {
      try {
        const validatedData = RecordGetSchema.parse(options);
        const { tableId, ...queryParams } = validatedData;

        // 构建查询参数
        const params: Record<string, string> = {};

        if (queryParams.viewId) {
          params.viewId = queryParams.viewId;
        }
        if (queryParams.take !== undefined) {
          params.take = String(queryParams.take);
        }
        if (queryParams.skip !== undefined) {
          params.skip = String(queryParams.skip);
        }
        if (queryParams.fieldKeyType) {
          params.fieldKeyType = queryParams.fieldKeyType;
        }
        if (queryParams.cellFormat) {
          params.cellFormat = queryParams.cellFormat;
        }
        if (queryParams.projection && queryParams.projection.length > 0) {
          params.projection = JSON.stringify(queryParams.projection);
        }
        if (queryParams.orderBy && queryParams.orderBy.length > 0) {
          params.orderBy = JSON.stringify(queryParams.orderBy);
        }
        if (queryParams.filter) {
          params.filter = JSON.stringify(queryParams.filter);
        }
        if (queryParams.search && queryParams.search.length > 0) {
          params.search = JSON.stringify(queryParams.search);
        }

        // 发送 GET 请求
        const response = await client.get<RecordGetResponse>(
          `/api/table/${tableId}/record`,
          { params },
        );

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        // 处理 Zod 验证错误
        if (error instanceof z.ZodError) {
          const errorMessages = error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ");
          return {
            success: false,
            error: `数据验证失败: ${errorMessages}`,
          };
        }

        // 处理其他错误
        return {
          success: false,
          error: error instanceof Error ? error.message : "获取记录失败",
        };
      }
    },

    async getById(
      options: RecordGetByIdOptions,
    ): Promise<TeableResponse<RecordGetByIdResponse>> {
      try {
        const validatedData = RecordGetByIdSchema.parse(options);
        const { tableId, recordId, ...queryParams } = validatedData;

        // 构建查询参数
        const params: Record<string, string> = {};

        if (queryParams.projection && queryParams.projection.length > 0) {
          params.projection = JSON.stringify(queryParams.projection);
        }
        if (queryParams.fieldKeyType) {
          params.fieldKeyType = queryParams.fieldKeyType;
        }
        if (queryParams.cellFormat) {
          params.cellFormat = queryParams.cellFormat;
        }

        // 发送 GET 请求获取单个记录
        const response = await client.get<RecordGetByIdResponse>(
          `/api/table/${tableId}/record/${recordId}`,
          { params },
        );

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        // 处理 Zod 验证错误
        if (error instanceof z.ZodError) {
          const errorMessages = error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ");
          return {
            success: false,
            error: `数据验证失败: ${errorMessages}`,
          };
        }

        // 处理其他错误
        return {
          success: false,
          error: error instanceof Error ? error.message : "获取单个记录失败",
        };
      }
    },

    async update(
      options: RecordUpdateOptions,
    ): Promise<TeableResponse<RecordUpdateResponse>> {
      try {
        const validatedData = RecordUpdateSchema.parse(options);
        const { tableId, recordId, record, ...queryParams } = validatedData;

        // 构建请求体
        const requestBody: {
          record: { fields: Record<string, any> };
          fieldKeyType?: FieldKeyType;
          typecast?: boolean;
          order?: RecordOrder;
        } = {
          record: record,
        };

        // 添加可选参数
        if (queryParams.fieldKeyType) {
          requestBody.fieldKeyType = queryParams.fieldKeyType;
        }
        if (queryParams.typecast !== undefined) {
          requestBody.typecast = queryParams.typecast;
        }
        if (queryParams.order) {
          requestBody.order = queryParams.order;
        }

        // 发送 PATCH 请求更新记录
        const response = await client.patch<RecordUpdateResponse>(
          `/api/table/${tableId}/record/${recordId}`,
          requestBody,
        );

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        // 处理 Zod 验证错误
        if (error instanceof z.ZodError) {
          const errorMessages = error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ");
          return {
            success: false,
            error: `数据验证失败: ${errorMessages}`,
          };
        }

        // 处理其他错误
        return {
          success: false,
          error: error instanceof Error ? error.message : "更新记录失败",
        };
      }
    },

    async delete(
      options: RecordDeleteOptions,
    ): Promise<TeableResponse<RecordDeleteResponse>> {
      try {
        const validatedData = RecordDeleteSchema.parse(options);
        const { tableId, recordId } = validatedData;

        // 发送 DELETE 请求删除记录
        await client.delete(`/api/table/${tableId}/record/${recordId}`);

        return {
          success: true,
          data: { success: true },
        };
      } catch (error) {
        // 处理 Zod 验证错误
        if (error instanceof z.ZodError) {
          const errorMessages = error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ");
          return {
            success: false,
            error: `数据验证失败: ${errorMessages}`,
          };
        }

        // 处理其他错误
        return {
          success: false,
          error: error instanceof Error ? error.message : "删除记录失败",
        };
      }
    },

    async uploadAttachment(
      options: RecordUploadAttachmentOptions,
    ): Promise<TeableResponse<RecordUploadAttachmentResponse>> {
      try {
        const validatedData = RecordUploadAttachmentSchema.parse(options);
        const { tableId, recordId, fieldId, file, fileUrl } = validatedData;

        // 构建 FormData
        const formData = new FormData();
        formData.append("file", file);
        if (fileUrl) {
          formData.append("fileUrl", fileUrl);
        }

        // 发送 POST 请求上传附件
        const response = await client.post<RecordUploadAttachmentResponse>(
          `/api/table/${tableId}/record/${recordId}/${fieldId}/uploadAttachment`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        return {
          success: true,
          data: response.data,
        };
      } catch (error) {
        // 处理 Zod 验证错误
        if (error instanceof z.ZodError) {
          const errorMessages = error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ");
          return {
            success: false,
            error: `数据验证失败: ${errorMessages}`,
          };
        }

        // 处理其他错误
        return {
          success: false,
          error: error instanceof Error ? error.message : "上传附件失败",
        };
      }
    },
  };
}

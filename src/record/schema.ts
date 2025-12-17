import z from "zod";

/**
 * 创建记录请求验证模式
 */
export const RecordCreateSchema = z.object({
  tableId: z.string().min(1, "表 ID 不能为空"),
  records: z
    .array(
      z.object({
        fields: z.record(z.string(), z.any()),
      })
    )
    .min(1, "至少需要一条记录"),
  fieldKeyType: z.enum(["name", "id", "dbFieldName"]).optional(),
  typecast: z.boolean().optional(),
  order: z
    .object({
      viewId: z.string().min(1),
      anchorId: z.string().min(1),
      position: z.enum(["before", "after"]),
    })
    .optional(),
});

/**
 * 获取记录请求验证模式
 */
export const RecordGetSchema = z.object({
  tableId: z.string().min(1, "表 ID 不能为空"),
  viewId: z.string().optional(),
  take: z.number().max(1000).optional(),
  skip: z.number().optional(),
  fieldKeyType: z.enum(["name", "id", "dbFieldName"]).optional(),
  cellFormat: z.enum(["json", "text"]).optional(),
  projection: z.array(z.string()).optional(),
  orderBy: z
    .array(
      z.object({
        field: z.string(),
        order: z.enum(["asc", "desc"]),
      })
    )
    .optional(),
  filter: z.record(z.string(), z.any()).optional(),
  search: z
    .array(
      z.object({
        field: z.string(),
        value: z.string(),
      })
    )
    .optional(),
});

/**
 * 获取单个记录请求验证模式
 */
export const RecordGetByIdSchema = z.object({
  tableId: z.string().min(1, "表 ID 不能为空"),
  recordId: z.string().min(1, "记录 ID 不能为空"),
  projection: z.array(z.string()).optional(),
  fieldKeyType: z.enum(["name", "id", "dbFieldName"]).optional(),
  cellFormat: z.enum(["json", "text"]).optional(),
});

/**
 * 更新记录请求验证模式
 */
export const RecordUpdateSchema = z.object({
  tableId: z.string().min(1, "表 ID 不能为空"),
  recordId: z.string().min(1, "记录 ID 不能为空"),
  record: z.object({
    fields: z.record(z.string(), z.any()),
  }),
  fieldKeyType: z.enum(["name", "id", "dbFieldName"]).optional(),
  typecast: z.boolean().optional(),
  order: z
    .object({
      viewId: z.string().min(1),
      anchorId: z.string().min(1),
      position: z.enum(["before", "after"]),
    })
    .optional(),
});

/**
 * 删除记录请求验证模式
 */
export const RecordDeleteSchema = z.object({
  tableId: z.string().min(1, "表 ID 不能为空"),
  recordId: z.string().min(1, "记录 ID 不能为空"),
});

/**
 * 上传附件请求验证模式
 */
export const RecordUploadAttachmentSchema = z.object({
  tableId: z.string().min(1, "表 ID 不能为空"),
  recordId: z.string().min(1, "记录 ID 不能为空"),
  fieldId: z.string().min(1, "字段 ID 不能为空"),
  file: z.instanceof(File, { message: "必须是一个 File 对象" }),
  fileUrl: z.string().optional(),
});
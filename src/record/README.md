# Teable Record API 文档

本文档包含了 Teable Record 相关的 API 文档，源自官方文档：https://help.teable.ai/zh/api-reference/record/

## API 列表

### 1. 获取单个记录 (Get Record)

**接口地址：** `GET /table/{tableId}/record/{recordId}`

**功能描述：** 通过记录 ID 获取单个记录，支持字段投影和输出格式选项。

#### 请求参数

**认证参数：**
- `Authorization` (header, required): Bearer 认证头，格式为 `Bearer <token>`

**路径参数：**
- `tableId` (string, required): 表格 ID
- `recordId` (string, required): 记录 ID

**查询参数：**
- `projection` (string[]): 如果只想获取某些字段，传入此参数，否则将获取所有可见字段
- `cellFormat` (enum<string>, default: "json"): 定义返回值格式，如果只需要简单的字符串值，可以设置为 text
  - 可选值: `json`, `text`
- `fieldKeyType` (enum<string>, default: "name"): 定义 record.fields[key] 的键类型
  - 可选值: `id`, `name`, `dbFieldName`

#### 响应示例

```json
{
  "id": "string",
  "fields": {},
  "name": "string",
  "autoNumber": 123,
  "createdTime": "string",
  "lastModifiedTime": "string",
  "createdBy": "string",
  "lastModifiedBy": "string",
  "permissions": {},
  "undeletable": true
}
```

#### cURL 示例

```bash
curl --request GET \
  --url 'https://app.teable.cn/api/table/{tableId}/record/{recordId}?projection=SOME_ARRAY_VALUE&cellFormat=SOME_STRING_VALUE&fieldKeyType=SOME_STRING_VALUE' \
  --header 'Authorization: Bearer REPLACE_BEARER_TOKEN'
```

---

### 2. 获取记录列表 (List Records)

**接口地址：** `GET /table/{tableId}/record`

**功能描述：** 获取记录列表，支持过滤、排序、分组和分页。

#### 请求参数

**路径参数：**
- `tableId` (string, required): 表格 ID

**查询参数：**
- `projection` (string[]): 字段投影，只获取指定字段
- `cellFormat` (enum<string>, default: "json"): 返回值格式
  - 可选值: `json`, `text`
- `fieldKeyType` (enum<string>, default: "name"): 字段键类型
  - 可选值: `id`, `name`, `dbFieldName`
- `viewId` (string): 设置要获取的视图，默认为第一个视图
- `ignoreViewQuery` (boolean): 当指定 viewId 时，设置为 true 将忽略视图的过滤、排序等
- `filterByTql` (string): 已弃用的 TQL 过滤语法
- `filter` (string): 基于字段、操作符和值的复杂查询条件
- `search` (array): 搜索匹配指定字段和值的记录
- `filterLinkCellCandidate` (array): 过滤出给定链接单元格可以选择的记录
- `filterLinkCellSelected` (array): 根据此链接单元格过滤出已选择的记录
- `selectedRecordIds` (string[]): 按记录 ID 过滤选定的记录
- `orderBy` (string): 指定记录排序方式的排序对象数组
- `groupBy` (string): 指定记录分组方式的分组对象数组
- `collapsedGroupIds` (string[]): 指定哪些组已折叠的组 ID 数组
- `queryId` (string): 查询 ID，将与其他查询参数合并
- `take` (integer): 要获取的记录数量，最大 2000
- `skip` (integer): 要跳过的记录数量

#### 响应示例

```json
{
  "records": [
    {
      "id": "recXXXXXXX",
      "fields": {
        "single line text": "text value"
      }
    }
  ],
  "extra": {
    "groupPoints": [
      {
        "id": "string",
        "type": 0,
        "depth": 1,
        "isCollapsed": true,
        "value": "unknown"
      }
    ],
    "allGroupHeaderRefs": [
      {
        "id": "string",
        "depth": 1
      }
    ],
    "searchHitIndex": [
      {
        "recordId": "string",
        "fieldId": "string"
      }
    ]
  }
}
```

---

### 3. 创建记录 (Create Records)

**接口地址：** `POST /table/{tableId}/record`

**功能描述：** 创建一个或多个记录，支持字段值类型转换和自定义记录排序。

#### 请求参数

**路径参数：**
- `tableId` (string, required): 表格 ID

**请求体 (application/json)：**
- `records` (object[], required): 记录对象数组
- `fieldKeyType` (enum<string>, default: "name"): 字段键类型
  - 可选值: `id`, `name`, `dbFieldName`
- `typecast` (boolean): 是否自动数据转换
- `order` (object): 记录插入位置（可选）

#### 请求示例

```json
{
  "fieldKeyType": "id",
  "typecast": true,
  "order": {
    "viewId": "string",
    "anchorId": "string",
    "position": "before"
  },
  "records": [
    {
      "fields": {
        "single line text": "text value"
      }
    }
  ]
}
```

#### 响应示例

```json
{
  "records": [
    {
      "id": "recXXXXXXX",
      "fields": {
        "single line text": "text value"
      }
    }
  ]
}
```

#### cURL 示例

```bash
curl --request POST \
  --url https://app.teable.cn/api/table/{tableId}/record \
  --header 'Authorization: Bearer REPLACE_BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '{"fieldKeyType":"id","typecast":true,"order":{"viewId":"string","anchorId":"string","position":"before"},"records":[{"fields":{"single line text":"text value"}}]}'
```

---

### 4. 更新记录 (Update Record)

**接口地址：** `PATCH /table/{tableId}/record/{recordId}`

**功能描述：** 通过 ID 更新单个记录，支持字段值类型转换和记录重新排序。

#### 请求参数

**路径参数：**
- `tableId` (string, required): 表格 ID
- `recordId` (string, required): 记录 ID

**请求体 (application/json)：**
- `record` (object, required): 记录对象
- `fieldKeyType` (enum<string>, default: "name"): 字段键类型
  - 可选值: `id`, `name`, `dbFieldName`
- `typecast` (boolean): 是否自动数据转换
- `order` (object): 记录插入位置（可选）

#### 请求示例

```json
{
  "fieldKeyType": "id",
  "typecast": true,
  "record": {
    "fields": {
      "property1": null,
      "property2": null
    }
  },
  "order": {
    "viewId": "string",
    "anchorId": "string",
    "position": "before"
  }
}
```

#### 响应示例

```json
{
  "id": "string",
  "fields": {},
  "name": "string",
  "autoNumber": 123,
  "createdTime": "string",
  "lastModifiedTime": "string",
  "createdBy": "string",
  "lastModifiedBy": "string",
  "permissions": {},
  "undeletable": true
}
```

#### cURL 示例

```bash
curl --request PATCH \
  --url https://app.teable.cn/api/table/{tableId}/record/{recordId} \
  --header 'Authorization: Bearer REPLACE_BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --data '{"fieldKeyType":"id","typecast":true,"record":{"fields":{"property1":null,"property2":null}},"order":{"viewId":"string","anchorId":"string","position":"before"}}'
```

---

### 5. 删除记录 (Delete Record)

**接口地址：** `DELETE /table/{tableId}/record/{recordId}`

**功能描述：** 通过 ID 永久删除单个记录。

#### 请求参数

**路径参数：**
- `tableId` (string, required): 表格 ID
- `recordId` (string, required): 记录 ID

#### 响应
- 200: 删除成功

#### cURL 示例

```bash
curl --request DELETE \
  --url https://app.teable.cn/api/table/{tableId}/record/{recordId} \
  --header 'Authorization: Bearer REPLACE_BEARER_TOKEN'
```

---

### 6. 上传附件 (Upload Attachment)

**接口地址：** `POST /table/{tableId}/record/{recordId}/{fieldId}/uploadAttachment`

**功能描述：** 从文件或 URL 上传附件并将其附加到单元格。

#### 请求参数

**路径参数：**
- `tableId` (string, required): 表格 ID
- `recordId` (string, required): 记录 ID
- `fieldId` (string, required): 附件字段的 ID

**请求体 (multipart/form-data)：**
- `file` (file): 要上传的文件
- `fileUrl` (string): 文件 URL

#### 响应示例

```json
{
  "id": "string",
  "fields": {},
  "name": "string",
  "autoNumber": 123,
  "createdTime": "string",
  "lastModifiedTime": "string",
  "createdBy": "string",
  "lastModifiedBy": "string",
  "permissions": {},
  "undeletable": true
}
```

#### cURL 示例

```bash
curl --request POST \
  --url https://app.teable.cn/api/table/{tableId}/record/{recordId}/{fieldId}/uploadAttachment \
  --header 'Authorization: Bearer REPLACE_BEARER_TOKEN' \
  --header 'content-type: multipart/form-data' \
  --form file=string \
  --form fileUrl=string
```

---

## 其他相关 API

根据官方文档，还有以下记录相关的 API 可供参考：

- **删除多条记录** (Delete records): `DELETE /table/{tableId}/record`
- **批量更新记录** (Update multiple records): `PATCH /table/{tableId}/record`
- **复制记录** (Duplicate record): `POST /table/{tableId}/record/{recordId}/duplicate`
- **获取记录历史** (Get record history): `GET /table/{tableId}/record/{recordId}/history`
- **获取表格记录历史** (Get table records history): `GET /table/{tableId}/record/history`
- **获取记录状态** (Get record status): `GET /table/{tableId}/record/{recordId}/status`
- **AI 自动填充单元格** (Auto-fill a cell by AI): `POST /table/{tableId}/record/{recordId}/{fieldId}/aiFill`
- **按钮点击** (Button click): `POST /table/{tableId}/record/{recordId}/{fieldId}/click`
- **按钮重置** (Button reset): `POST /table/{tableId}/record/{recordId}/{fieldId}/reset`

## 通用说明

### 认证
所有 API 都需要 Bearer Token 认证，格式为：`Authorization: Bearer <token>`

### 响应格式
- 成功响应通常是 JSON 格式
- 错误响应会包含相应的错误信息和状态码

### 字段键类型 (fieldKeyType)
- `name`: 使用字段名称作为键
- `id`: 使用字段 ID 作为键
- `dbFieldName`: 使用数据库字段名作为键

### 类型转换 (typecast)
- 当 `typecast` 为 true 时，会自动转换数据类型
- 默认为 false，以确保数据完整性

### 分页参数
- `take`: 限制返回的记录数量（最大 2000）
- `skip`: 跳过指定数量的记录

---

**文档来源：** https://help.teable.ai/zh/api-reference/record/
**更新时间：** 2025-12-10
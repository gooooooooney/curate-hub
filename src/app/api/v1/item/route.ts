import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { itemInsert } from "@/lib/db/schema";
import { addItem } from "@/server/items/add";
import { updateItem } from "@/server/items/update";
import { deleteItem } from "@/server/items/update";
import { NextRequest } from "next/server";
import { z } from "zod";

const tagIdsSchema = z.array(z.string())

/**
 * 路由: POST /api/v1/item
 * 作用: 创建新物品
 * 参数:
 *   - item: object (请求体) - 物品信息，包含名称、描述等
 *   - tagIds: string[] (请求体) - 物品标签ID列表
 * 返回: 包含新创建物品信息的 JSON 响应
 */
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { tagIds, item } = body;
  const newItem = itemInsert
    .omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      deletedAt: true
    }).safeParse(item);
  const tagIdsResult = tagIdsSchema.safeParse(tagIds);
  if (!newItem.success || !tagIdsResult.success) {
    return apiErrorResponse({ msg: newItem.error?.message || tagIdsResult.error?.message || 'Invalid params', code: 400, status: 400 });
  }

  try {
    await addItem(newItem.data, tagIdsResult.data);
    return apiResponse({ msg: 'add item success' });
  } catch (error) {
    return apiErrorResponse({ msg: `add item error: ${error}`, code: 500, status: 500 });
  }
}

const updateItemSchema = z.object({
  itemId: z.string(),
  updatedData: itemInsert.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    isDeleted: true,
    deletedAt: true,
    userId: true,
    likeCount: true,
  })
});

/**
 * 路由: PUT /api/v1/item
 * 作用: 更新物品信息
 * 参数:
 *   - itemId: string (请求体) - 物品ID
 *   - updatedData: object (请求体) - 更新的物品信息，包含可选的标题、描述等字段
 * 返回: 包含更新后物品信息的 JSON 响应
 */
export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const result = updateItemSchema.safeParse(body);
  if (!result.success) {
    return apiErrorResponse({ msg: 'Invalid params', code: 400, status: 400 });
  }

  try {
    const updatedItem = await updateItem(result.data.itemId, result.data.updatedData);
    return apiResponse({ data: updatedItem });
  } catch (error) {
    return apiErrorResponse({ msg: `Update item error: ${error}`, code: 500, status: 500 });
  }
};

const itemIdSchema = z.string()

/**
 * 路由: DELETE /api/v1/item
 * 作用: 删除物品
 * 参数:
 *   - itemId: string (请求体) - 物品ID
 * 返回: 包含删除结果的 JSON 响应
 */
export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const itemId = searchParams.get('itemId');
  const result = itemIdSchema.safeParse(itemId);
  if (!result.success) {
    return apiErrorResponse({ msg: 'Invalid params', code: 400, status: 400 });
  }

  try {
    await deleteItem(result.data);
    return apiResponse({ msg: 'Item deleted successfully' });
  } catch (error) {
    return apiErrorResponse({ msg: `Delete item error: ${error}`, code: 500, status: 500 });
  }
};
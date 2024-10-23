

import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { getItemsByTag } from "@/server/items/get";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  userId: z.string(),
  tagId: z.string(),
})

/**
 * 路由: GET /api/v1/item/get-items-by-tag
 * 作用: 根据标签获取物品列表
 * 参数:
 *   - userId: string (查询参数) - 用户ID
 *   - tagId: string (查询参数) - 要查询的标签ID
 * 返回: 包含匹配标签的物品列表的 JSON 响应
 */
export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const userId = params.get('userId');
  const tagId = params.get('tagId');
  const result = schema.safeParse({ userId, tagId });
  if (!result.success) {
    return apiErrorResponse({ msg: 'Invalid params', code: 400, status: 400 });
  }
  try {
    const items = await getItemsByTag(result.data.userId, result.data.tagId);
    return apiResponse({ data: items });
  } catch (error) {
    return apiErrorResponse({ msg: `Internal server error in get items by tag: ${error}`, code: 500, status: 500 });
  }
}

import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { getItemsByUserId } from "@/server/items/get";
import { NextRequest } from "next/server";

/**
 * 路由: GET /api/v1/item/get-all
 * 作用: 获取指定用户的所有物品列表
 * 参数:
 *   - id: string (查询参数) - 用户ID
 * 返回: 包含用户所有物品的 JSON 响应
 */
export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const userId = params.get('id');
  if (!userId) {
    return apiErrorResponse({ msg: 'userId is required', code: 400, status: 400 });
  }
  const result = await getItemsByUserId(userId);
  return apiResponse({ data: result });
}

import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { likeItem, unlikeItem } from "@/server/items/put";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  itemId: z.string(),
  userId: z.string(),
});

/**
 * 路由: POST /api/v1/item/like
 * 作用: 给指定的item点赞
 * 参数:
 *   - itemId: string (请求体) - 要点赞的item的ID
 * 返回: 包含更新后item信息的 JSON 响应
 */
export const POST = async (req: NextRequest) => {

  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return apiErrorResponse({ msg: '无效的参数', code: 400, status: 400 });
  }

  try {
    const updatedItem = await likeItem(result.data.itemId, result.data.userId);
    return apiResponse({ data: updatedItem });
  } catch (error) {
    return apiErrorResponse({ msg: `点赞失败: ${error}`, code: 500, status: 500 });
  }
};

/**
 * 路由: DELETE /api/v1/item/like
 * 作用: 取消给指定的item的点赞
 * 参数:
 *   - itemId: string (查询参数) - 要取消点赞的item的ID
 * 返回: 包含更新后item信息的 JSON 响应
 */
export const DELETE = async (req: NextRequest) => {


  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get('itemId');
  const userId = searchParams.get('userId');
  if (!itemId || !userId) {
    return apiErrorResponse({ msg: '缺少itemId或userId参数', code: 400, status: 400 });
  }

  try {
    const updatedItem = await unlikeItem(itemId, userId);
    return apiResponse({ data: updatedItem });
  } catch (error) {
    return apiErrorResponse({ msg: `取消点赞失败: ${error}`, code: 500, status: 500 });
  }
};

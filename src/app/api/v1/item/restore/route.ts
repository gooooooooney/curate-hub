import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { restoreItems } from "@/server/items/update";
import { NextRequest } from "next/server";
import { z } from "zod";

// Define the schema for the request body
const restoreSchema = z.array(z.string())

/**
 * 路由: POST /api/v1/item/restore
 * 作用: 恢复已删除的物品
 * 参数:
 *   - itemIds: string[] (请求体) - 要恢复的物品ID列表
 * 返回: 包含恢复后物品信息的 JSON 响应
 */
export const POST = async (req: NextRequest) => {
  // Parse the request body
  const body = await req.json();
  const result = restoreSchema.safeParse(body);
  
  // Validate the request body
  if (!result.success) {
    return apiErrorResponse({ msg: `Invalid params: ${result.error.message}`, code: 400, status: 400 });
  }

  try {
    // Restore the items
    const restoredItems = await restoreItems(result.data);
    return apiResponse({ data: restoredItems });
  } catch (error) {
    return apiErrorResponse({ msg: `Restore items error: ${error}`, code: 500, status: 500 });
  }
};

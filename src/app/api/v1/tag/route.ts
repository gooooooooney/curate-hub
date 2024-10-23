import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { insertTag } from "@/server/tag/insert";
import { NextRequest } from "next/server";
import { z } from "zod";


const schema = z.object({
  name: z.string(),
})


/**
 * 路由: GET /api/v1/tag
 * 作用: 获取所有标签列表
 * 参数: 无
 * 返回: 包含所有标签的 JSON 响应
 *
 * 路由: POST /api/v1/tag
 * 作用: 创建新标签
 * 参数:
 *   - name: string (请求体) - 新标签的名称
 * 返回: 包含新创建标签信息的 JSON 响应
 */
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return apiErrorResponse({ msg: 'Invalid params', code: 400, status: 400 });
  }
  try {
    const { name } = result.data;
    const tag = await insertTag(name);
    return apiResponse({ data: tag });
  } catch (error) {
    return apiErrorResponse({ msg: `Internal server error in insert tag: ${error}`, code: 500, status: 500 });
  }
}

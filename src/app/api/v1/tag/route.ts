import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { insertTag } from "@/server/tag/insert";
import { getAllTags } from "@/server/tag/get";
import { NextRequest } from "next/server";
import { z } from "zod";


const schema = z.object({
  name: z.string(),
})


/**
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

const getTagsSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  pageSize: z.string().regex(/^\d+$/).transform(Number).optional(),
});

/**
 * 路由: GET /api/v1/tag
 * 作用: 获取所有标签（带分页）
 * 参数:
 *   - page: number (可选，查询参数) - 页码，默认为1
 *   - pageSize: number (可选，查询参数) - 每页数量，默认为10
 * 返回: 包含标签列表和分页信息的 JSON 响应
 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const result = getTagsSchema.safeParse(Object.fromEntries(searchParams));

  if (!result.success) {
    return apiErrorResponse({ msg: 'Invalid params', code: 400, status: 400 });
  }

  try {
    const { page = 1, pageSize = 10 } = result.data;
    const tagsData = await getAllTags(page, pageSize);
    return apiResponse({ data: tagsData });
  } catch (error) {
    return apiErrorResponse({ msg: `Error fetching tags: ${error}`, code: 500, status: 500 });
  }
};

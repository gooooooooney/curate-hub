import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { updateTag } from "@/server/tag/update";
import { NextRequest } from "next/server";
import { z } from "zod";

const updateTagSchema = z.object({
  name: z.string().min(1),
});

/**
 * 路由: PUT /api/v1/tag/[id]
 * 作用: 更新指定ID的标签
 * 参数:
 *   - id: string (路径参数) - 要更新的标签ID
 *   - name: string (请求体) - 新的标签名称
 * 返回: 包含更新后标签信息的 JSON 响应
 */
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const body = await req.json();
  const result = updateTagSchema.safeParse(body);

  if (!result.success) {
    return apiErrorResponse({ msg: 'Invalid params', code: 400, status: 400 });
  }

  try {
    const updatedTag = await updateTag(params.id, result.data.name);
    return apiResponse({ data: updatedTag });
  } catch (error) {
    if (error instanceof Error && error.message === "Tag not found") {
      return apiErrorResponse({ msg: 'Tag not found', code: 404, status: 404 });
    }
    return apiErrorResponse({ msg: `Error updating tag: ${error}`, code: 500, status: 500 });
  }
};

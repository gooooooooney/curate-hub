import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { getItemsByTag } from "@/server/items/get";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  userId: z.number(),
  tagId: z.number(),
})

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
    return apiErrorResponse({ msg: 'Internal server error', code: 500, status: 500 });
  }
}

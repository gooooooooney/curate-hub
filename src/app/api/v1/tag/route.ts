import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { insertTag } from "@/server/tag/insert";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
})

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
    return apiErrorResponse({ msg: 'Internal server error in insert tag', code: 500, status: 500 });
  }
}

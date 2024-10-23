import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { getItemsByUserId } from "@/server/items/get";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const userId = params.get('id');
  console.log(userId, '-->');
  if (!userId) {
    return apiErrorResponse({ msg: 'userId is required', code: 400, status: 400 });
  }
  if (isNaN(Number(userId))) {
    return apiErrorResponse({ msg: 'userId must be a number', code: 400, status: 400 });
  }
  const result = await getItemsByUserId(Number(userId));
  return apiResponse({ data: result });
}

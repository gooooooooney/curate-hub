import { apiErrorResponse, apiResponse } from "@/lib/api/response";
import { itemInsert } from "@/lib/db/schema";
import { addItem } from "@/server/items/add";
import { z } from "zod";

const tagIdsSchema = z.array(z.number())

export const POST = async (req: Request) => {
  const body = await req.json();
  const { tagIds, ...item } = body;
  const newItem = itemInsert
    .omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: true,
      deletedAt: true
    }).safeParse(item);
  const tagIdsResult = tagIdsSchema.safeParse(tagIds);
  if (!newItem.success || !tagIdsResult.success) {
    return apiErrorResponse({ msg: newItem.error?.message || tagIdsResult.error?.message || 'Invalid params', code: 400, status: 400 });
  }
  try {
    await addItem(newItem.data, tagIdsResult.data);
    return apiResponse({ msg: 'add item success' });
  } catch (error) {
    return apiErrorResponse({ msg: 'add item error', code: 500, status: 500 });
  }
}

import { db } from "@/lib/db";
import { table_tags } from "@/lib/db/schema/tags";
import { desc } from "drizzle-orm";

export const getAllTags = async (page: number = 1, pageSize: number = 10) => {
  const offset = (page - 1) * pageSize;

  const tags = await db.select({
    id: table_tags.id,
    name: table_tags.name,
    createdAt: table_tags.createdAt,
  })
  .from(table_tags)
  .orderBy(desc(table_tags.createdAt))
  .limit(pageSize)
  .offset(offset);

  const count = await db.$count(table_tags);

  return {
    tags,
    totalCount: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: page,
  };
};

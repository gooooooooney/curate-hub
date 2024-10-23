import { db } from "@/lib/db";
import { tags } from "@/lib/db/schema/tags";
import { eq } from "drizzle-orm";

export const insertTag = async (name: string) => {
  return await db.transaction(async (tx) => {
    // 查找现有标签
    const existingTag = await tx.query.tags.findFirst({
      where: eq(tags.name, name),
      columns: {
        id: true,
        name: true,
        createdAt: true,
      }
    });

    // 如果标签已存在，直接返回
    if (existingTag) {
      return existingTag;
    }

    // 如果标签不存在，创建新标签
    const [newTag] = await tx.insert(tags).values({ name }).returning({
      id: tags.id,
      name: tags.name,
      createdAt: tags.createdAt,
    });
    return newTag;
  });
};

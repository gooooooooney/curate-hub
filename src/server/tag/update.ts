import { db } from "@/lib/db";
import { table_tags } from "@/lib/db/schema/tags";
import { eq } from "drizzle-orm";

export const updateTag = async (id: string, name: string) => {
  const [updatedTag] = await db
    .update(table_tags)
    .set({ name })
    .where(eq(table_tags.id, id))
    .returning({
      id: table_tags.id,
      name: table_tags.name,
      createdAt: table_tags.createdAt,
    });

  if (!updatedTag) {
    throw new Error("Tag not found");
  }

  return updatedTag;
};

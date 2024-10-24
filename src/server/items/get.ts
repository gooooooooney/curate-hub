import { db } from "@/lib/db";
import { table_itemTags } from "@/lib/db/schema";
import { table_items } from "@/lib/db/schema/items";
import { table_tags } from "@/lib/db/schema/tags";
import { and, eq, isNull, inArray } from "drizzle-orm";
import { table_itemLikes } from "@/lib/db/schema/itemLikes";

/**
 * 根据用户ID获取所有未删除的物品
 * @param userId 用户ID
 * @returns 物品列表，包含每个物品的标签信息和是否点赞
 */
export const getItemsByUserId = async (userId: string) => {
  const itemList = await db.query.table_items.findMany({
    where: and(
      eq(table_items.userId, userId),  // 匹配用户ID
      eq(table_items.isDeleted, false),  // 物品未被标记为删除
      isNull(table_items.deletedAt),  // 删除时间为空
    ),
    columns: {
      deletedAt: false,  // 不返回删除时间字段
      isDeleted: false,  // 不返回是否删除字段
    },
    with: {
      itemTags: {
        columns: {},  // 不返回 itemTags 表的任何列
        with: {
          tag: true,  // 包含关联的标签信息
        }
      },
      itemsLikes: {
        where: eq(table_itemLikes.userId, userId),
        columns: {
          id: true,
        },
      },
    }
  });

  // 添加 isLiked 属性
  return itemList.map(item => ({
    ...item,
    isLiked: item.itemsLikes.length > 0,
  }));
}

/**
 * 根据用户ID和标签ID获取物品
 * @param userId 用户ID
 * @param tagId 标签ID
 * @returns 匹配的物品列表，包含每个物品的标签信息和是否点赞
 */
export const getItemsByTag = async (userId: string, tagId: string) => {
  return await db.transaction(async (tx) => {
    const items = await tx.query.table_items.findMany({
      where: and(
        eq(table_items.userId, userId),  // 匹配用户ID
        eq(table_items.isDeleted, false),  // 物品未被标记为删除
        isNull(table_items.deletedAt),  // 删除时间为空
        // 使用子查询检查物品是否与指定标签关联
        inArray(
          table_items.id,
          tx.select({ itemId: table_itemTags.itemId })
            .from(table_itemTags)
            .where(and(
              eq(table_itemTags.tagId, tagId),
              // 确保标签未被删除
              eq(table_itemTags.tagId, tx.select({ id: table_tags.id })
                .from(table_tags)
                .where(and(
                  eq(table_tags.id, tagId),
                  isNull(table_tags.deletedAt)
                ))
                .limit(1)
              )
            ))
        )
      ),
      columns: {
        deletedAt: false,  // 不返回删除时间字段
        isDeleted: false,  // 不返回是否删除字段
      },
      with: {
        itemTags: {
          where: eq(table_itemTags.tagId, tagId),
          columns: {},  // 不返回 itemTags 表的任何列
          with: {
            tag: true,  // 包含关联的标签信息
          }
        },
        itemsLikes: {
          where: eq(table_itemLikes.userId, userId),
          columns: {
            id: true,
          },
        },
      }
    });

    // 添加 isLiked 属性
    return items.map(item => ({
      ...item,
      isLiked: item.itemsLikes.length > 0,
    }));
  });
}

// export const getItemsByTag = async (userId: string, tagId: string) => {
//   return await db.transaction(async (tx) => {
//     // 首先查找指定的标签
//     const tag = await tx.query.table_tags.findFirst({
//       where: and(
//         eq(table_tags.id, tagId),  // 匹配标签ID
//         isNull(table_tags.deletedAt),  // 标签未被删除
//       ),
//       columns: {
//         // 不返回任何列，只需要确认标签存在
//       },
//       with: {
//         itemTags: {
//           columns: {
//             itemId: true,  // 只返回关联的物品ID
//           }
//         }
//       }
//     });
//     // 如果标签不存在，返回空数组
//     if (!tag) {
//       return [];
//     }

//     // 查找与标签关联的物品
//     return await tx.query.table_items.findMany({
//       where: and(
//         eq(table_items.userId, userId),  // 匹配用户ID
//         eq(table_items.isDeleted, false),  // 物品未被标记为删除
//         isNull(table_items.deletedAt),  // 删除时间为空
//         inArray(
//           table_items.id,
//           tag.itemTags.map(itemTag => itemTag.itemId).filter((id): id is string => id !== null)
//           // 物品ID在标签关联的物品ID列表中
//         )
//       ),
//       columns: {
//         deletedAt: false,  // 不返回删除时间字段
//         isDeleted: false,  // 不返回是否删除字段
//       },
//       with: {
//         itemTags: {
//           where: eq(table_itemTags.tagId, tagId),
//           columns: {},  // 不返回 itemTags 表的任何列
//           with: {
//             tag: true,  // 包含关联的标签信息
//           }
//         }
//       }
//     });
//   });
// }

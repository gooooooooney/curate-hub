import { db } from "@/lib/db";
import { itemTags } from "@/lib/db/schema";
import { items } from "@/lib/db/schema/items";
import { tags } from "@/lib/db/schema/tags";
import { and, eq, isNull, inArray } from "drizzle-orm";

/**
 * 根据用户ID获取所有未删除的物品
 * @param userId 用户ID
 * @returns 物品列表，包含每个物品的标签信息
 */
export const getItemsByUserId = async (userId: string) => {
  const itemList = await db.query.items.findMany({
    where: and(
      eq(items.userId, userId),  // 匹配用户ID
      eq(items.isDeleted, false),  // 物品未被标记为删除
      isNull(items.deletedAt),  // 删除时间为空
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
      }
    }
  })
  return itemList;
}

/**
 * 根据用户ID和标签ID获取物品
 * @param userId 用户ID
 * @param tagId 标签ID
 * @returns 匹配的物品列表，包含每个物品的标签信息
 */
export const getItemsByTag = async (userId: string, tagId: string) => {
  return await db.transaction(async (tx) => {
    return await tx.query.items.findMany({
      where: and(
        eq(items.userId, userId),  // 匹配用户ID
        eq(items.isDeleted, false),  // 物品未被标记为删除
        isNull(items.deletedAt),  // 删除时间为空
        // 使用子查询检查物品是否与指定标签关联
        inArray(
          items.id,
          tx.select({ itemId: itemTags.itemId })
            .from(itemTags)
            .where(and(
              eq(itemTags.tagId, tagId),
              // 确保标签未被删除
              eq(itemTags.tagId, tx.select({ id: tags.id })
                .from(tags)
                .where(and(
                  eq(tags.id, tagId),
                  isNull(tags.deletedAt)
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
          where: eq(itemTags.tagId, tagId),
          columns: {},  // 不返回 itemTags 表的任何列
          with: {
            tag: true,  // 包含关联的标签信息
          }
        }
      }
    });
  });
}

// export const getItemsByTag = async (userId: string, tagId: string) => {
//   return await db.transaction(async (tx) => {
//     // 首先查找指定的标签
//     const tag = await tx.query.tags.findFirst({
//       where: and(
//         eq(tags.id, tagId),  // 匹配标签ID
//         isNull(tags.deletedAt),  // 标签未被删除
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
//     return await tx.query.items.findMany({
//       where: and(
//         eq(items.userId, userId),  // 匹配用户ID
//         eq(items.isDeleted, false),  // 物品未被标记为删除
//         isNull(items.deletedAt),  // 删除时间为空
//         inArray(
//           items.id,
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
//           where: eq(itemTags.tagId, tagId),
//           columns: {},  // 不返回 itemTags 表的任何列
//           with: {
//             tag: true,  // 包含关联的标签信息
//           }
//         }
//       }
//     });
//   });
// }

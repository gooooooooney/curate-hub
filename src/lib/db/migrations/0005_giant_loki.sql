DROP INDEX IF EXISTS "uniq_collection_item";--> statement-breakpoint
DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "users_external_id_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "uniq_like";--> statement-breakpoint
DROP INDEX IF EXISTS "uniq_item_tag";--> statement-breakpoint
DROP INDEX IF EXISTS "tags_name_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "uniq_follow";--> statement-breakpoint
ALTER TABLE `collections` ALTER COLUMN "name" TO "name" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_collection_item` ON `collection_items` (`collection_id`,`item_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_external_id_unique` ON `users` (`external_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_like` ON `item_likes` (`item_id`,`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_item_tag` ON `item_tags` (`item_id`,`tag_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_follow` ON `user_follows` (`follower_id`,`following_id`);
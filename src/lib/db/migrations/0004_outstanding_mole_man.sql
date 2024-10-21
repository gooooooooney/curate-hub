PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_collection_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`collection_id` integer,
	`item_id` integer,
	`order` integer,
	FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_collection_items`("id", "collection_id", "item_id", "order") SELECT "id", "collection_id", "item_id", "order" FROM `collection_items`;--> statement-breakpoint
DROP TABLE `collection_items`;--> statement-breakpoint
ALTER TABLE `__new_collection_items` RENAME TO `collection_items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_collection_item` ON `collection_items` (`collection_id`,`item_id`);--> statement-breakpoint
CREATE TABLE `__new_item_likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`item_id` integer,
	`user_id` integer,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_item_likes`("id", "item_id", "user_id") SELECT "id", "item_id", "user_id" FROM `item_likes`;--> statement-breakpoint
DROP TABLE `item_likes`;--> statement-breakpoint
ALTER TABLE `__new_item_likes` RENAME TO `item_likes`;--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_like` ON `item_likes` (`item_id`,`user_id`);--> statement-breakpoint
CREATE TABLE `__new_item_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`item_id` integer,
	`tag_id` integer,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_item_tags`("id", "item_id", "tag_id") SELECT "id", "item_id", "tag_id" FROM `item_tags`;--> statement-breakpoint
DROP TABLE `item_tags`;--> statement-breakpoint
ALTER TABLE `__new_item_tags` RENAME TO `item_tags`;--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_item_tag` ON `item_tags` (`item_id`,`tag_id`);--> statement-breakpoint
CREATE TABLE `__new_user_follows` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`follower_id` integer,
	`following_id` integer,
	`created_at` integer,
	FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`following_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_user_follows`("id", "follower_id", "following_id", "created_at") SELECT "id", "follower_id", "following_id", "created_at" FROM `user_follows`;--> statement-breakpoint
DROP TABLE `user_follows`;--> statement-breakpoint
ALTER TABLE `__new_user_follows` RENAME TO `user_follows`;--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_follow` ON `user_follows` (`follower_id`,`following_id`);
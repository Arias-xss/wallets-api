CREATE TABLE `currencies` (
	`id` integer PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`symbol` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `currency_exchanges` (
	`destination_id` integer PRIMARY KEY NOT NULL,
	`rate` text NOT NULL,
	FOREIGN KEY (`destination_id`) REFERENCES `currencies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wallets` (
	`address` text PRIMARY KEY NOT NULL,
	`favorite` integer NOT NULL,
	`old` integer NOT NULL,
	`balance` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_favorite` ON `wallets` (`favorite`);
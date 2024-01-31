CREATE TABLE `subscription` (
  `plan_id` integer PRIMARY KEY,
  `Plan_name` varchar(255),
  `Price` integer,
  `Size_Limit` float,
  `Attempts_number` integer,
  `Attempts_Limits` integer,
  `duration` integer,
  `history_limit` integer
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `username` varchar(255),
  `email` varchar(255),
  `password` integer,
  `age` integer,
  `country` varchar(255),
  `remain_attempts` integer,
  `attempts_history` integer,
  `sub_start` timestamp,
  `sub_end` timestamp,
  `id_sub` integer
);

CREATE TABLE `data` (
  `id` integer PRIMARY KEY,
  `img_data` varchar(255),
  `text_data` blob,
  `user_id` integer,
  `media_name` varchar(255),
  `media_size` float,
  `model_result` varchar(255),
  `attempet_time` timestamp
);

CREATE TABLE `admin` (
  `name` varchar(255),
  `ID` integer,
  `permitions` varchar(255),
  `email` varchar(255),
  `password` integer
);

ALTER TABLE `data` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `subscription` ADD FOREIGN KEY (`plan_id`) REFERENCES `users` (`id_sub`);

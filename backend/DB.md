CREATE TABLE Themes (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE Users (
id VARCHAR(50) NOT NULL COMMENT 'Google(G-id), Naver(N-id), Kakao(K-id), Default(D-id)',
email VARCHAR(45) NULL,
password VARCHAR(45) NULL,
nickname VARCHAR(45) NULL,
joined_at TIMESTAMP NULL DEFAULT now(),
last_login TIMESTAMP NULL DEFAULT now(),
theme_id INT NULL DEFAULT 0 COMMENT 'References Themes(id)',
points INT NULL DEFAULT 0,
PRIMARY KEY (id),
FOREIGN KEY (theme_id) REFERENCES Themes (id)
);

CREATE TABLE DailyGames (
id VARCHAR(50) NOT NULL COMMENT 'Daily Game ID',
size_type INT NULL,
created_at TIMESTAMP NULL DEFAULT now(),
run_count INT NULL DEFAULT 0,
complete_count INT NULL DEFAULT 0,
description VARCHAR(255) NULL,
PRIMARY KEY (id)
);

CREATE TABLE DailyGameRecords (
id INT NOT NULL AUTO_INCREMENT COMMENT 'Record ID',
daily_game_id VARCHAR(50) NOT NULL COMMENT 'Daily Game ID',
user_id VARCHAR(50) NOT NULL COMMENT 'User ID',
completed_at TIMESTAMP NULL DEFAULT now(),
record_time TIMESTAMP NULL,
PRIMARY KEY (id),
FOREIGN KEY (daily_game_id) REFERENCES DailyGames (id),
FOREIGN KEY (user_id) REFERENCES Users (id)
);

CREATE TABLE CustomGames (
id VARCHAR(50) NOT NULL COMMENT 'Custom Game ID',
user_id VARCHAR(50) NOT NULL COMMENT 'User ID',
height INT NULL,
width INT NULL,
created_at TIMESTAMP NULL DEFAULT now(),
run_count INT NULL DEFAULT 0,
complete_count INT NULL DEFAULT 0,
description VARCHAR(255) NULL,
title VARCHAR(45) NULL,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES Users (id)
);

CREATE TABLE CustomGameRecords (
id INT NOT NULL AUTO_INCREMENT COMMENT 'Record ID',
user_id VARCHAR(50) NOT NULL COMMENT 'User ID',
custom_game_id VARCHAR(50) NOT NULL COMMENT 'Custom Game ID',
completed_at TIMESTAMP NULL DEFAULT now(),
record_time TIMESTAMP NULL,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES Users (id),
FOREIGN KEY (custom_game_id) REFERENCES CustomGames (id)
);

CREATE TABLE GameSettings (
id INT NOT NULL AUTO_INCREMENT COMMENT 'Settings ID',
user_id VARCHAR(50) NOT NULL COMMENT 'User ID',
notify_line_complete INT NULL DEFAULT 1 COMMENT 'Line Complete Notification',
notify_current_position INT NULL DEFAULT 1 COMMENT 'Current Position Notification',
grid_visibility INT NULL DEFAULT 1 COMMENT 'Grid Visibility',
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES Users (id)
);

CREATE TABLE UserImages (
id INT NOT NULL AUTO_INCREMENT COMMENT 'Image ID',
user_id VARCHAR(50) NOT NULL COMMENT 'User ID',
image_url VARCHAR(255) NOT NULL COMMENT 'Image URL',
uploaded_at TIMESTAMP DEFAULT now() COMMENT 'Uploaded Time',
is_active BOOLEAN DEFAULT true COMMENT 'Is Active Profile Image',
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES Users (id)
);

CREATE TABLE Images (
id INT NOT NULL AUTO_INCREMENT COMMENT 'Image ID',
user_id VARCHAR(50) NOT NULL COMMENT 'User ID',
image_data JSON NULL COMMENT 'Image Data',
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES Users (id)
);

--Création des tables de l'application
--todo : tout

DROP TABLE IF EXISTS events_characters;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS elements_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS elements;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS statuts;

CREATE TABLE IF NOT EXISTS statuts (
	statut_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)   
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

INSERT INTO statuts (name) VALUES ('ongoing');
INSERT INTO statuts (name) VALUES ('paused');
INSERT INTO statuts (name) VALUES ('finished');

CREATE TABLE IF NOT EXISTS projects (
	project_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    summary TEXT,
    creation_date DATE,
    statut_id INT NOT NULL,
    parent_id INT,
    INDEX (statut_id),
    INDEX (parent_id),
    FOREIGN KEY (statut_id) REFERENCES statuts(statut_id),
    FOREIGN KEY (parent_id) REFERENCES projects(project_id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS elements(
	element_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	project_id INT,
	creation_date DATETIME,
	modification_date DATETIME,
	INDEX (project_id),
	FOREIGN KEY (project_id) REFERENCES projects(project_id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS tags(
	tag_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) 
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS elements_tags(
	tag_id INT NOT NULL,
	element_id INT NOT NULL,
	PRIMARY KEY (tag_id, element_id),
	FOREIGN KEY (element_id) REFERENCES elements(element_id),
	FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS locations (
	location_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	element_id INT,
    name VARCHAR(50),
    description TEXT,
    parent_id INT,
    INDEX (element_id),
    INDEX (parent_id),
    FOREIGN KEY (element_id) REFERENCES elements(element_id),
    FOREIGN KEY (parent_id) REFERENCES locations(location_id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS characters (
	character_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	element_id INT,
    name VARCHAR(50),
    surname VARCHAR(50),
    description TEXT,
    mental TEXT,
    INDEX (element_id),
    FOREIGN KEY (element_id) REFERENCES elements(element_id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS events (
	event_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	element_id INT,
    name VARCHAR(50),
    description TEXT,
    event_date VARCHAR(50),
    location_id INT,
    parent_id INT,
    INDEX (element_id),
    INDEX (parent_id),
    INDEX (location_id),
    FOREIGN KEY (element_id) REFERENCES elements(element_id),
    FOREIGN KEY (parent_id) REFERENCES events(event_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS events_characters(
	event_id INT NOT NULL,
	character_id INT NOT NULL,
	PRIMARY KEY (event_id, character_id),
	FOREIGN KEY (event_id) REFERENCES events(event_id),
	FOREIGN KEY (character_id) REFERENCES characters(character_id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;
CREATE TABLE koala(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	gender VARCHAR(1),
	age INT,
	ready_to_transfer BOOLEAN DEFAULT false,
	notes TEXT);
	
INSERT into koala
	(name, gender, age, ready_to_transfer, notes)
VALUES
	('Scotty', 'M', '4', 'True', 'Born in Guatemala'),
	('Jean', 'F', '5', 'True', 'Allergic to lots of lava'),
	('Ororo', 'F', '7', 'False', 'Loves listening to Paula (Abdul)'),
	('Logan', 'M', '15', 'False', 'Loves the sauna'),
	('Charlie', 'M', '9', 'True', 'Favorite band is Nirvana  '),
	('Betsy', 'F', '4', 'True', 'Has a pet iguana');
	

	SELECT * FROM "koala"
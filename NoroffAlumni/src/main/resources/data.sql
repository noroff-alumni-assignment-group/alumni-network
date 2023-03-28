INSERT INTO topic(name,description) VALUES('Cars','All about cars');
INSERT INTO topic(name,description) VALUES('Job','All about work');
INSERT INTO topic(name,description) VALUES('Summer','All about the summer');
INSERT INTO topic(name,description) VALUES('Coding','All about Coding');
INSERT INTO topic(name,description) VALUES('Ski','All about ski');
INSERT INTO topic(name,description) VALUES('snowboard','All about snowboard');
INSERT INTO topic(name,description) VALUES('Football','All about Football');
INSERT INTO topic(name,description) VALUES('Hardware','All about hardware');
INSERT INTO topic(name,description) VALUES('Engineering','All about Engineering');
INSERT INTO topic(name,description) VALUES('Ice bathing','All about ice bathing');
INSERT INTO topic(name,description) VALUES('Java','All about java');
INSERT INTO topic(name,description) VALUES('C ++','All about C ++');

INSERT INTO post(title, body) VALUES('Thank you for having me, ICC!', 'I had a great time meeting all of you!');
INSERT INTO post(title, body) VALUES('Understanding how to interact with people', 'A recent study by NTNU showed that on average, people between the age of 18-24 no longer... ');

INSERT INTO event (created_by, group_id, title, description, date, time, location, name, theme) VALUES
                                                                                             ('Alice', '1', 'Cooking Class', 'Learn how to make a delicious meal!', '2022-05-01', '18:00', '456 Main St.', 'Cooking Class', '1'),
                                                                                             ('Bob', '2', 'Movie Night', 'Watch a great movie with friends!', '2022-06-10', '20:00', '789 Cinema Lane', 'Movie Night', '2'),
                                                                                             ('Charlie', '3', 'Game Night', 'Bring your favorite board games and let''s play!', '2022-07-15', '19:00', '123 Game St.', 'Game Night', '2'),
                                                                                             ('Alice', '1', 'Charity Event', 'Help raise money for a good cause!', '2022-08-01', '14:00', '456 Charity Ave.', 'Charity Event', '3'),
                                                                                             ('Bob', '2', 'BBQ Party', 'Enjoy delicious food and drinks!', '2022-08-20', '16:00', '789 BBQ Blvd.', 'BBQ Party', '1');

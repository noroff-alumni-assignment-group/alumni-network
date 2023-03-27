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
INSERT INTO post (title, body) VALUES('Does anyone know where the coffee machine went?', 'I think someone stole the coffeee machine, and now none of us can get our work done, please come forward...');

INSERT INTO groups(name,description,is_private) VALUES('Trondheim teams','For everyone based in nidaros', false);
INSERT INTO groups(name,description,is_Private) VALUES('Book club','All about books', false);
INSERT INTO groups(name,description,is_private) VALUES('Fashion and cats','Professionals only', false);
INSERT INTO groups(name,description,is_private) VALUES('Newbies corner','No stupid questions', false);
INSERT INTO groups(name,description,is_private) VALUES('Secret group','Youre not supposed to see this', true);

INSERT INTO group_posts(group_id, post_id) VALUES(1, 3);
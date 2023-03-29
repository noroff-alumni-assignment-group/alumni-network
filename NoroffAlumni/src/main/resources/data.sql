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


INSERT INTO event (created_by, group_id, title, description, date, time, location, name, theme) VALUES
                                                                                             ('Alice', '1', 'Cooking Class', 'Learn how to make a delicious meal!', '2022-05-01', '18:00', '456 Main St.', 'Cooking Class', '1'),
                                                                                             ('Bob', '2', 'Movie Night', 'Watch a great movie with friends!', '2022-06-10', '20:00', '789 Cinema Lane', 'Movie Night', '2'),
                                                                                             ('Charlie', '3', 'Game Night', 'Bring your favorite board games and let''s play!', '2022-07-15', '19:00', '123 Game St.', 'Game Night', '2'),
                                                                                             ('Alice', '1', 'Charity Event', 'Help raise money for a good cause!', '2022-08-01', '14:00', '456 Charity Ave.', 'Charity Event', '3'),
                                                                                             ('Bob', '2', 'BBQ Party', 'Enjoy delicious food and drinks!', '2022-08-20', '16:00', '789 BBQ Blvd.', 'BBQ Party', '1');
INSERT INTO groups(is_private,name,description) VALUES (false,'Code Wizards', 'This group is dedicated to all things programming. Whether you´re a beginner or an experienced developer, you`ll find resources and support for everything from learning new languages to solving complex coding challenges.');
INSERT INTO groups(is_private,name,description) VALUES (false,'DevOps Heroes', 'DevOps Heroes is a group for professionals interested in the intersection of software development and IT operations. Members share knowledge and expertise on topics like automation, continuous integration and delivery, and containerization to help streamline software delivery pipelines.');
INSERT INTO groups(is_private,name,description) VALUES (false,'Tech Innovators', 'Tech Innovators is a community of forward-thinking developers, designers, and entrepreneurs who are passionate about pushing the boundaries of technology. Members collaborate on projects and share insights on emerging trends in areas like artificial intelligence, blockchain, and the Internet of Things.');

INSERT INTO groups(name,description,is_private) VALUES('Trondheim teams','For everyone based in nidaros', false);
INSERT INTO groups(name,description,is_Private) VALUES('Experis book club','All about books', false);
INSERT INTO groups(name,description,is_private) VALUES('Java discussions','For everything Java', false);
INSERT INTO groups(name,description,is_private) VALUES('Newbies corner','No stupid questions', false);
INSERT INTO groups(name,description,is_private) VALUES('Secret group','Youre not supposed to see this', true);


INSERT INTO users(id,title,username,email,first_name,last_name,biography,funfact) VALUES ('48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d','Fullstack developer','oliviamiller','olivia.miller@example.com','Olivia','Miller','Just a girl trying to make her way in the world, one day at a time.','Olivia is fluent in four languages.');
INSERT INTO users(id,title,username,email,first_name,last_name,biography,funfact) VALUES ('6b51d04c-f880-4ac9-93b5-bc53e81bc50b','CEO at Ava-tech','ethanlee96','ethan.lee@example.com','Ethan','Lee','Aspiring entrepreneur with a passion for innovation and problem-solving.','Ethan once ran a marathon on a whim, without any prior training.');
INSERT INTO users(id,title,username,email,first_name,last_name,biography,funfact) VALUES ('73a0dc81-2416-469c-9f75-e13d75bd5f34','Freelance journalist','avapatel22','ava.patel@example.com','Ava','Patel','Lover of animals and nature, striving to make the world a better place for all.','Ava once saved a baby bird and nursed it back to health.');
INSERT INTO users(id,title,username,email,first_name,last_name,biography,funfact) VALUES ('1aa307ac-5018-4e91-926e-8496617d2d54','UOT, undergraduate','jacksonkim123','jackson.kim@example.com','Jackson','Kim','Always looking for the next adventure, whether it''s traveling to a new country or trying a new sport.','Jackson has a black belt in taekwondo.');
INSERT INTO users(id,title,username,email,first_name,last_name,biography,funfact) VALUES ('28250440-c5d2-453e-a0c2-31c150277e92','Aspiring artist','chloewong88','chloe.wong@example.com','Chloe','Wong','Creative soul with a passion for art and music, constantly seeking inspiration from the world around her.','Chloe once painted a mural on the side of a building in her hometown.');

INSERT INTO group_members(group_id,user_id) VALUES (1,'48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');
INSERT INTO group_members(group_id,user_id) VALUES (1,'6b51d04c-f880-4ac9-93b5-bc53e81bc50b');
INSERT INTO group_members(group_id,user_id) VALUES (1,'73a0dc81-2416-469c-9f75-e13d75bd5f34');
INSERT INTO group_members(group_id,user_id) VALUES (1,'1aa307ac-5018-4e91-926e-8496617d2d54');
INSERT INTO group_members(group_id,user_id) VALUES (1,'28250440-c5d2-453e-a0c2-31c150277e92');
INSERT INTO group_members(group_id,user_id) VALUES (2,'48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');
INSERT INTO group_members(group_id,user_id) VALUES (2,'6b51d04c-f880-4ac9-93b5-bc53e81bc50b');
INSERT INTO group_members(group_id,user_id) VALUES (2,'73a0dc81-2416-469c-9f75-e13d75bd5f34');
INSERT INTO group_members(group_id,user_id) VALUES (2,'1aa307ac-5018-4e91-926e-8496617d2d54');
INSERT INTO group_members(group_id,user_id) VALUES (2,'28250440-c5d2-453e-a0c2-31c150277e92');
INSERT INTO group_members(group_id,user_id) VALUES (3,'48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');
INSERT INTO group_members(group_id,user_id) VALUES (3,'6b51d04c-f880-4ac9-93b5-bc53e81bc50b');
INSERT INTO group_members(group_id,user_id) VALUES (3,'73a0dc81-2416-469c-9f75-e13d75bd5f34');
INSERT INTO group_members(group_id,user_id) VALUES (3,'1aa307ac-5018-4e91-926e-8496617d2d54');
INSERT INTO group_members(group_id,user_id) VALUES (3,'28250440-c5d2-453e-a0c2-31c150277e92');



INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('1','48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('2','48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('3','48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('4','48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');

INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('1','6b51d04c-f880-4ac9-93b5-bc53e81bc50b');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('2','6b51d04c-f880-4ac9-93b5-bc53e81bc50b');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('3','6b51d04c-f880-4ac9-93b5-bc53e81bc50b');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('4','6b51d04c-f880-4ac9-93b5-bc53e81bc50b');

INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('5','73a0dc81-2416-469c-9f75-e13d75bd5f34');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('6','73a0dc81-2416-469c-9f75-e13d75bd5f34');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('7','73a0dc81-2416-469c-9f75-e13d75bd5f34');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('8','73a0dc81-2416-469c-9f75-e13d75bd5f34');

INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('5','1aa307ac-5018-4e91-926e-8496617d2d54');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('6','1aa307ac-5018-4e91-926e-8496617d2d54');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('7','1aa307ac-5018-4e91-926e-8496617d2d54');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('8','1aa307ac-5018-4e91-926e-8496617d2d54');

INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('1','28250440-c5d2-453e-a0c2-31c150277e92');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('2','28250440-c5d2-453e-a0c2-31c150277e92');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('7','28250440-c5d2-453e-a0c2-31c150277e92');
INSERT INTO topic_subscriptions(topic_id,user_id) VALUES('8','28250440-c5d2-453e-a0c2-31c150277e92');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Introduction to IT Development','IT Development is a field that involves the creation of software and applications for various devices such as computers, smartphones, and tablets. It involves programming languages such as Java, Python, and C++. IT Development is an exciting and rewarding field to work in.','2022-01-01','48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Agile Development Methodologies','Agile development is a methodology that emphasizes iterative development, collaboration, and flexibility. It is often used in software development to improve efficiency and responsiveness to changes. Some popular Agile methodologies include Scrum, Kanban, and Lean.','2022-01-02','6b51d04c-f880-4ac9-93b5-bc53e81bc50b');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Object-Oriented Programming','Object-oriented programming (OOP) is a programming paradigm that focuses on the creation of objects that can be manipulated and interacted with. OOP is commonly used in software development because it allows for better organization and abstraction of code. Some popular OOP languages include Java and C#.','2022-01-03','73a0dc81-2416-469c-9f75-e13d75bd5f34');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Cloud Computing','Cloud computing is the delivery of computing services over the internet. This includes storage, servers, databases, and software. Cloud computing allows for scalability, flexibility, and cost savings. Some popular cloud computing providers include Amazon Web Services (AWS), Microsoft Azure, and Google Cloud.','2022-01-04','1aa307ac-5018-4e91-926e-8496617d2d54');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Web Development','Web development is the process of creating websites and web applications. It involves frontend development using HTML, CSS, and JavaScript, as well as backend development using programming languages like PHP, Python, and Ruby. Web development is a constantly evolving field with new technologies and frameworks emerging all the time.','2022-01-05','28250440-c5d2-453e-a0c2-31c150277e92');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Test-Driven Development','Test-driven development (TDD) is a software development process that emphasizes writing tests before writing code. This helps ensure that the code is correct and that changes don''t introduce new bugs. TDD is often used in Agile development methodologies.','2022-01-06','48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Git and Version Control','Git is a version control system that allows for collaborative software development. It allows developers to track changes to code, collaborate with others, and revert to previous versions if necessary. Git is widely used in the software development industry and is a valuable skill for developers to have.','2022-01-07','6b51d04c-f880-4ac9-93b5-bc53e81bc50b');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Mobile App Development','Mobile app development is the process of creating applications for mobile devices such as smartphones and tablets. It involves programming languages such as Java, Kotlin, Swift, and Objective-C. Mobile app development is a growing field with a high demand for skilled developers.','2022-01-08','73a0dc81-2416-469c-9f75-e13d75bd5f34');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Cybersecurity','Cybersecurity involves protecting computer systems and networks from unauthorized access, theft, or damage. It includes measures such as firewalls, encryption, and access controls. Cybersecurity is a critical concern in today''s digital world, as cyber threats continue to grow in sophistication and frequency.','2022-01-09','1aa307ac-5018-4e91-926e-8496617d2d54');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Software Design Patterns','Software design patterns are reusable solutions to common programming problems. They help improve code quality, maintainability, and scalability. Some popular design patterns include the Singleton pattern, Factory pattern, and Observer pattern.','2022-01-10','28250440-c5d2-453e-a0c2-31c150277e92');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Artificial Intelligence and Machine Learning','Artificial intelligence (AI) and machine learning (ML) involve the use of computer algorithms to analyze data and make predictions or decisions. AI and ML are used in a wide range of applications, from autonomous vehicles to natural language processing. Popular programming languages for AI and ML include Python, R, and MATLAB.','2022-01-11','48cec1a0-ffd8-465b-97f1-b6cbcd07ab8d');

INSERT INTO post(title,body,last_updated,author_id)
VALUES ('Full-Stack Development','Full-stack development involves working on both the frontend and backend of a web application. This includes developing the user interface, server-side logic, and database integration. Full-stack developers need to have a wide range of skills and be comfortable with multiple programming languages and frameworks.','2022-01-12','6b51d04c-f880-4ac9-93b5-bc53e81bc50b');


INSERT INTO topic_posts(topic_id, post_id) VALUES (1, 1);
INSERT INTO topic_posts(topic_id, post_id) VALUES (2, 2);
INSERT INTO topic_posts(topic_id, post_id) VALUES (3, 3);
INSERT INTO topic_posts(topic_id, post_id) VALUES (4, 4);
INSERT INTO topic_posts(topic_id, post_id) VALUES (5, 5);
INSERT INTO topic_posts(topic_id, post_id) VALUES (6, 6);
INSERT INTO topic_posts(topic_id, post_id) VALUES (7, 7);
INSERT INTO topic_posts(topic_id, post_id) VALUES (8, 8);
INSERT INTO topic_posts(topic_id, post_id) VALUES (9, 9);
INSERT INTO topic_posts(topic_id, post_id) VALUES (10, 10);
INSERT INTO topic_posts(topic_id, post_id) VALUES (11, 11);
INSERT INTO topic_posts(topic_id, post_id) VALUES (12, 12);
INSERT INTO topic_posts(topic_id, post_id) VALUES (1, 2);
INSERT INTO topic_posts(topic_id, post_id) VALUES (2, 3);
INSERT INTO topic_posts(topic_id, post_id) VALUES (3, 4);
INSERT INTO topic_posts(topic_id, post_id) VALUES (4, 5);
INSERT INTO topic_posts(topic_id, post_id) VALUES (5, 6);
INSERT INTO topic_posts(topic_id, post_id) VALUES (6, 7);
INSERT INTO topic_posts(topic_id, post_id) VALUES (7, 8);
INSERT INTO topic_posts(topic_id, post_id) VALUES (8, 9);
INSERT INTO topic_posts(topic_id, post_id) VALUES (9, 10);
INSERT INTO topic_posts(topic_id, post_id) VALUES (10, 11);
INSERT INTO topic_posts(topic_id, post_id) VALUES (11, 12);
INSERT INTO topic_posts(topic_id, post_id) VALUES (12, 1);
INSERT INTO topic_posts(topic_id, post_id) VALUES (1, 3);
INSERT INTO topic_posts(topic_id, post_id) VALUES (2, 4);
INSERT INTO topic_posts(topic_id, post_id) VALUES (3, 5);
INSERT INTO topic_posts(topic_id, post_id) VALUES (4, 6);
INSERT INTO topic_posts(topic_id, post_id) VALUES (5, 7);
INSERT INTO topic_posts(topic_id, post_id) VALUES (6, 8);
INSERT INTO topic_posts(topic_id, post_id) VALUES (7, 9);
INSERT INTO topic_posts(topic_id, post_id) VALUES (8, 10);
INSERT INTO topic_posts(topic_id, post_id) VALUES (9, 11);
INSERT INTO topic_posts(topic_id, post_id) VALUES (10, 12);
INSERT INTO topic_posts(topic_id, post_id) VALUES (11, 1);
INSERT INTO topic_posts(topic_id, post_id) VALUES (12, 2);

INSERT INTO group_posts(group_id, post_id) VALUES(1, 1);
INSERT INTO group_posts(group_id, post_id) VALUES(1, 3);
INSERT INTO group_posts(group_id, post_id) VALUES(4, 2);

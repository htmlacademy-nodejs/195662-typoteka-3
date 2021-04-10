/*Заполнение таблицы users*/
INSERT INTO users (email, firstName, lastName, password, avatar) VALUES
('ivanov@example.com', 'Иван', 'Иванов', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar1.jpg'),
('petrov@example.com', 'Пётр', 'Петров', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar2.jpg');
/*Заполнение таблицы categories*/
INSERT INTO categories (title) VALUES
('Деревья'),
('За жизнь'),
('Без рамки'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Программирование'),
('Железо');
/*Заполнение таблицы articles*/
ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles (title, picture, announce, text, user_id) VALUES
('Как собрать камни бесконечности', 'image03.jpg', 'Он написал больше 30 хитов.', 'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Золотое сечение — соотношение двух величин, гармоническая пропорция.', 1),
('Как перестать беспокоиться и начать жить', 'image03.jpg', 'Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?', 'Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Из под его пера вышло 8 платиновых альбомов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Программировать не настолько сложно, как об этом говорят. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Он написал больше 30 хитов.', 2),
('Как начать программировать', 'image03.jpg', 'Собрать камни бесконечности легко, если вы прирожденный герой. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?', 'Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят. Ёлки — это не просто красивое дерево. Это прочная древесина. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов. Собрать камни бесконечности легко, если вы прирожденный герой. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Как начать действовать? Для начала просто соберитесь. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.', 1);
ALTER TABLE articles ENABLE TRIGGER ALL;
/*Заполнение таблицы articles_categories*/
ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories (article_id, category_id) VALUES
(1, 5),
(2, 9),
(2, 5),
(3, 6),
(3, 9);
ALTER TABLE articles_categories ENABLE TRIGGER ALL;
/*Заполнение таблицы comments*/
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments (article_id, user_id, text) VALUES
(1, 1, 'Хочу такую же футболку :-) Планируете записать видосик на эту тему?'),
(2, 1, 'Совсем немного...'),
(2, 1, 'Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?'),
(2, 1, 'Планируете записать видосик на эту тему?'),
(2, 2, 'Совсем немного...'),
(2, 2, 'Согласен с автором!'),
(3, 1, 'Мне кажется или я уже читал это где-то?'),
(3, 1, 'Хочу такую же футболку :-) Совсем немного...'),
(3, 1, 'Это где ж такие красоты? Согласен с автором!');
ALTER TABLE comments ENABLE TRIGGER ALL;

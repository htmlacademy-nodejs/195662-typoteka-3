/*Заполнение таблицы users*/
INSERT INTO users(email, firstname, lastname, password, avatar) VALUES
('ivanov@example.com',  'Иван', 'Иванов', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar1.jpg'),
('petrov@example.com', 'Пётр', 'Петров', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar2.jpg');

/*Заполнение таблицы categories*/
INSERT INTO categories(title) VALUES
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
INSERT INTO articles(title, picture, announce, text, user_id) VALUES
('Как собрать камни бесконечности',
'image01.jpg',
'Достичь успеха помогут ежедневные повторения.',
'Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Достичь успеха помогут ежедневные повторения.',
1),
('Как достигнуть успеха не вставая с кресла',
'image02.jpg',
'Первая большая ёлка была установлена только в 1938 году.',
'Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Первая большая ёлка была установлена только в 1938 году. Рок-музыка всегда ассоциировалась с протестами.',
2),
('Как начать программировать',
'image03.jpg',
'Ёлки — это не просто красивое дерево.',
'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.',
1);
ALTER TABLE articles ENABLE TRIGGER ALL;

/*Заполнение таблицы articles_categories*/
ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories(article_id, category_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 5),
(3, 6),
(3, 7),
(3, 8);
ALTER TABLE articles_categories ENABLE TRIGGER ALL;

/*Заполнение таблицы comments*/
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, user_id, article_id) VALUES
('Давно не пользуюсь стационарными компьютерами.', 1, 1),
('Планируете записать видосик на эту тему?', 1, 2),
('Плюсую, но слишком много буквы!', 1, 3),
('Согласен с автором!', 2, 1),
('Мне кажется или я уже читал это где-то?', 2, 2),
('Мне не нравится ваш стиль.', 2, 3),
('Хочу такую же футболку :-)', 2, 3);
ALTER TABLE comments ENABLE TRIGGER ALL;

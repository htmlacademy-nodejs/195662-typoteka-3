/*Список всех категорий*/
SELECT * FROM categories;

/*Список категорий для которых создана минимум одна публикация*/
SELECT id, title FROM categories
INNER JOIN articles_categories
ON id = category_id
GROUP BY id;

/*Список категорий с количеством публикаций*/
SELECT id, title, count(article_id) FROM categories
LEFT JOIN articles_categories
ON id = category_id
GROUP BY id;

/*Список публикаций*/
SELECT
articles.id,
articles.title,
articles.announce,
articles.date,
users.firstname,
users.lastname,
users.email,
count(comments.id) AS comments_count,
STRING_AGG(DISTINCT categories.title, ', ') AS category_list
FROM articles
INNER JOIN users ON articles.user_id = users.id
LEFT JOIN comments ON articles.id = comments.article_id
INNER JOIN articles_categories ON articles.id = articles_categories.article_id
INNER JOIN categories ON articles_categories.category_id = categories.id
GROUP BY articles.id, users.id
ORDER BY articles.date DESC;

/*Публикация*/
SELECT
articles.id,
articles.title,
articles.announce,
articles.text,
articles.date,
articles.picture,
users.firstname,
users.lastname,
users.email,
count(comments.id) AS comments_count,
STRING_AGG(DISTINCT categories.title, ', ') AS category_list
FROM articles
INNER JOIN users ON articles.user_id = users.id
LEFT JOIN comments ON articles.id = comments.article_id
INNER JOIN articles_categories ON articles.id = articles_categories.article_id
INNER JOIN categories ON articles_categories.category_id = categories.id
WHERE articles.id = 1
GROUP BY articles.id, users.id;

/*5 последних комментариев*/
SELECT
comments.id,
comments.article_id,
users.firstname,
users.lastname,
comments.text
FROM comments
INNER JOIN users ON user_id = users.id
ORDER BY comments.datetime DESC
LIMIT 5;

/*Комментарии к публикации*/
SELECT
comments.id,
comments.article_id,
users.firstname,
users.lastname,
comments.text
FROM comments
INNER JOIN users ON user_id = users.id
WHERE comments.article_id = 1
ORDER BY comments.datetime DESC;

/*Обновить заголовок публикации*/
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;

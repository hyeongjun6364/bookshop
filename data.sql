INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("어린왕자들", "종이책", 0, "어리다..", "많이 어리다..", "김어림", 100, "목차입니다.", 20000, "2019-01-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("신데렐라들", "종이책", 1, "유리구두..", "투명한 유리구두..", "김구두", 100, "목차입니다.", 20000, "2024-10-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("백설공주들", "종이책", 2, "사과..", "빨간 사과..", "김사과", 100, "목차입니다.", 20000, "2023-11-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("흥부와 놀부들", "종이책", 3, "제비..", "까만 제비..", "김제비", 100, "목차입니다.", 20000, "2023-12-08");

SELECT * FROM books LEFT
join category on books.category_id = category.id


SELECT * FROM books LEFT
join category on books.category_id = category.id
where books.id = 1

insert into likes (user_id, liked_book_id) values (1,1)

//장바구니 담기
insert into cartItems (book_id,quantity,user_id) values (1,1,1)

//장바구니 아이템 목록 조회
select cartItems.id,book_id,title,summary,quantity,price from cartItems left join books on cartItems.book_id = books.id
// 장바구니에서 선택한 목록 조회
SELECT * FROM Bookshop.cartItems where user_id =1 and id in (1,3)
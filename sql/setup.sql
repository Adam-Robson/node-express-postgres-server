-- SQL in this file can be executed with `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS authors_books;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released SMALLINT NOT NULL
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob DATE NOT NULL,
    pob VARCHAR NOT NULL
);

CREATE TABLE authors_books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    title VARCHAR NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY 
);

INSERT INTO
  users (email, password_hash, first_name, last_name)
VALUES
  (
    'alvin@example.com',
    'notarealpasswordhash',
    'Alvin',
    'A'
  ),
  (
    'bob@example.com',
    'notarealpasswordhash',
    'Bob',
    'B'
  ),
  (
    'carole@example.com',
    'notarealpasswordhash',
    'Carole',
    'C'
  );

INSERT INTO books
(title, released)
VALUES
    ('The Ingenious Gentleman Don Quixote of La Mancha', 1615),
    ('La Galatea', 1585),
    ('Frankenstein', 1818),
    ('The Invisible Man', 1952),
    ('Going to the Territory', 1986),
    ('Narrative of the Life of Frederick Douglas', 1845),
    ('My Bondage and My Freedom', 1855),
    ('The Lottery in Babylon', 1941),
    ('A Tale of Two Cities', 1859),
    ('David Copperfield', 1850),
    ('The Count of Monte Cristo', 1844),
    ('The Scarlett Letter', 1850),
    ('The Color Purple', 1982),
    ('A Hitchikers Guide to the Galaxy', 1979),
    ('Black Beauty', 1877),
    ('Moby Dick', 1851),
    ('Brave New World', 1932),
    ('The Perrenial Philosophy', 1945);

INSERT INTO authors
(name, dob, pob)
VALUES
    ('Miguel de Cervantes', '1547-09-29', 'Alcala de Henares, Spain'),
    ('Mary Shelley', '1797-08-30', 'Somers Town, London, UK'),
    ('Ralph Ellison', '1914-03-01', 'Oklahoma City, OK, US'),
    ('Frederick Douglass', '1818-02-01', 'Talbot County, MD, US'),
    ('Jorge Luis Borges', '1899-08-24', 'Buenos Aires, Argentina'),
    ('Charles Dickens', '1812-02-07', 'Landport, Portsmouth, UK'),
    ('Alexander Dumas', '1802-07-24', 'Villers-Cotterêts, France'),
    ('Nathaniel Hawthorne', '1804-07-04', 'Salem, MA, US'),
    ('Alice Walker', '1944-02-09', 'Eatonton, GA, US'),
    ('Douglas Adams', '1952-03-11', 'Cambridge, UK'),
    ('Anna Sewell', '1820-05-30', 'Great Yarmouth, UK'),
    ('Herman Melville', '1819-08-01', 'New York, NY, US'),
    ('Aldous Huxley', '1894-07-26', 'Godalming, UK');

INSERT INTO authors_books
(author_id, book_id, title)
VALUES
    (1, 1, 'The Ingenious Gentleman Don Quixote of La Mancha'),
    (1, 2, 'La Galatea'),
    (2, 3, 'Frankenstein'),
    (3, 4, 'The Invisible Man'),
    (3, 5, 'Going to the Territory'),
    (4, 6, 'Narrative of the Life of Frederick Douglas'),
    (4, 7, 'My Bondage and My Freedom'),
    (5, 8, 'The Lottery in Babylon'),
    (6, 9, 'A Tale of Two Cities'),
    (6, 10, 'David Copperfield'),
    (7, 11, 'The Count of Monte Cristo'),
    (8, 12, 'The Scarlett Letter'),
    (9, 13, 'The Color Purple'),
    (10, 14, 'A Hitchiker&apos;s Guide to the Galaxy'),
    (11, 15, 'Black Beauty'),
    (12, 16, 'Moby Dick'),
    (13, 17, 'Brave New World'),
    (13, 18, 'The Perennial Philosophy');

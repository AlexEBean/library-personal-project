# Personal Project

## MVP
- Users can create an account
- Users can login to website
- Users and admin can view the catalog of books
- Users can both add and remove holds on books
- Users can view their holds
- Users can edit their profile_pic
- Admin can add and remove books
- Admin can view list of all holds, along with the book title, email and username of the user that placed the hold  (JOIN statement)
- Users can receive emails, regarding holds

## Icebox
- Admin can view all users
- Admin can remove users
- Admin can edit a user's status to be an admin
- Users can view their hold history
- Book will state whether it is available or not
- Users will be able to check out books
- Users can edit their password if they are able to enter in their old one
- Users can add comments on books
- Users can edit comments
- Users can delete comments

### Database

- Schemas:

library_users
```SQL
CREATE TABLE library_users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR (20),
    last_name VARCHAR (30)
    email VARCHAR(60) UNIQUE,
    username VARCHAR(40) UNIQUE,
    password TEXT,
    profile_pic VARCHAR(3000)
    admin: BOOLEAN
);
```

books
```SQL
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    img VARCHAR(3000),
    title VARCHAR(200),
    ISBN VARCHAR(3000)
    year INT,
    author VARCHAR(200)
);
```

holds
```SQL
CREATE TABLE holds(
    hold_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    book_id INT REFERENCES books(book_id),
);
```

### Server
- Dependencies:
    - express
    - massive
    - dotenv
    - express-session
    - bcrypt
    - aws-sdk
    - uuid
    - nodemailer

- File Structure:
    - server/
        - index.js
        - controllers/
            - authController.js
            - bookController.js
            - holdController.js

- Endpoints:
    - auth endpoints:
        - register => '/auth/register'
        - login => '/auth/login'
        - logout => '/auth/logout'
        - getUser => '/auth/get_user'
    - book endpoints: 
        - read books => '/api/books'
        - delete => '/api/book/:id'
        - create => '/api/book'
    - hold endpoints:
        - read all holds => '/api/holds
        - read user holds => '/api/holds/:id'
        - delete => '/api/hold/:id'
        - create => '/api/hold'
    - account endpoint:
        - edit profile_pic => '/api/user'

### Front-end

- Dependencies: 
    - axios
    - react-router-dom
    - redux
    - react-redux
    - redux-promise-middleware

- File Structure:
    - src/
        - App.js
        - App.css
        - reset.css
        - routes.js
            - '/' => Home.js
            - '/login' => Auth.js
            - '/catalog' => Catalog.js
            - '/account' => Account.js
            - '/admin' => Admin.js
        - redux/
            - store.js
            - authReducer.js
            - holdReducer.js
        - components/
            - Nav.js
            - Home.js
            - Auth.js
            - Catalog.js
            - Book.js
            - Account.js
            - UserHolds.js
            - Admin.js
            - AllHolds.js


<a href = "https://www.figma.com/file/R2wzAQNqEFaK3sSLXHNHrT/Untitled?node-id=0%3A1"> My Figma Wireframe </a>
## NodeJs-AngularJs-Initiator
This project initiator will help to kick start any project which has API in NodeJs and front end in AngularJs. This project contains basic Authentication APIs in NodeJs and Admin portal in AngulaJs. 
It also includes error messages in multi-language.

## Which APIs are included in this project?
1. **Sign Up** - POST - `/api/auth/signup` - Sign up using name, email, password, dob and mobile number
2. **Login** - POST - `/api/auth/login` - Login using email and password
3. **Login by social media** - POST - `/api/auth/loginBySocialMedia` - Login by Google, Facebook and Apple
4. **Get user detail** - GET - `/api/user/getUserDetail?user_id={{USER_ID}}` - Get user's basic detail
5. **Update user detail** - GET - `/api/user/updateUserDetail` - Update user's basic detail

## How to start the project?
1. Clone the repository
2. Run `npm install` to install all dependancy
3. Create database in your local and import database > node-api-initiator.sql file
4. Change database credentials in config > config.json file
5. Run `npm start`. API and Admin portal will start working on 8000 port.

## How to check APIs?
Import postman collection and you can see all the API calls

## How to open an admin portal?
Just hit the url http://localhost:8000/ to open an admin portal.<br/>
Admin credentials: admin@demo.com / admin@1234

## How to return error message in different language?
Pass Accept-Language to "de" in postman Headers to see error message in german language

## Technologies
* Node 12.18.4
* Angular 1.6
* Bootstrap 4
* SB Admin 2 Bootstrap template

## Do you need any help?
Feel free to reach out to me on svkdprashant@gmail.com

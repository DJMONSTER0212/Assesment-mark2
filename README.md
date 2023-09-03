# 🚀 API & Application Documentation

This repository contains the API documentation and Functionality description of my project. The API is designed to manage users, authentication, OTPs, sessions, and tasks.

## 🛠 Technologies Used
- React.js
- Node.js
- Express.js
- MongoDB

## 🚀 Routes

### User Routes

1. *Register User* 📝
   - *Endpoint:* `/api/user/register`
   - *Method:* `POST`
   - *Body:* 
     json
     {
       "username": "example12345",
       "password": "devansh@0212",
       "email": "example12345@gmail.com",
       "firstName": "Bill",
       "lastName": "paykarde",
       "mobile": "839383931",
       "address": "Rameshwar Nagar",
       "profile": ""
     }
     

2. *Get User* 📖
   - *Endpoint:* `/api/user/example123`
   - *Method:* `GET`

3. *Update User* 🔄
   - *Endpoint:* `/api/user/updateuser?id=64eb9095bea1ce081efa5896`
   - *Method:* `PUT`
   - *Body:* 
     json
     {
       "firstName": "DJ"
     }
     

... [Add other user routes similarly]

### Auth Routes

1. *Login* 🔐
   - *Endpoint:* `/api/auth/login`
   - *Method:* `POST`



### OTP Routes

1. *Generate OTP* 📲
   - *Endpoint:* `/api/otp/generateOTP`
   - *Method:* `GET`

2. *Verify OTP* 📲
     - *Endpoint:* `/api/otp/verifyOTP?code=<otp>&username<username>`
   - *Method:* `GET`

### Session Routes

1. *New Session Request* 📅
   - *Endpoint:* `/api/session/createResetSession`
   - *Method:* `GET`



### Task Routes

1. *Create Task* 📌
   - *Endpoint:* `/api/task/create`
   - *Method:* `POST`
   - *Body:* 
     json
     {
       "title": "Test",
       "description": "ThisisaTestTask",
       "priority": 2,
       "username": "example1234"
     }
     

    2. *Get All Tasks* 📌
   - *Endpoint:* `/api/task/:username`
   - *Method:* `GET`
   - *Body:* 
    
3. *DELETE Task* 📌
   - *Endpoint:* `/api/task/delete/:taskId`
   - *Method:* `DELETE`
   - *Body:* 
     json
     {
       "id" : "<TaskId>"
     }
4. *UPDATE Task* 📌
   - *Endpoint:* `/api/task/update/:taskId`
   - *Method:* `PUT`
   - *Body:* 
     json
     {
       "title": "Test",
       "description": "ThisisaTestTask",
       "priority": 2,
       "username": "example1234"
     }
5. *GET Individual Task* 📌
   - *Endpoint:* `/api/task/:username/taskId`
   - *Method:* `GET`
   - *Body:* 

## 🚀 Setup

1. Clone the repository.
2. Go to client Directory
3. Install dependencies using `npm install`.
4. Then go to server Directory.
5. Install dependencies using `npm install`.
6. Set up your `.env` file with necessary configurations.
7. Go to cliet Directory and run the client side application using `npm run start`.
8. Go to Server Directory and run the server using `nodemon server.js`.


## 🚀 Login/Sign-Up and Work flow
1. You will land on the Username page, there you will have to enter your registered username and if you have not registered yet you can register by clicking on the register option.
2. After registering and username validation U will be redirected to password verification page where you have to enter your valid password and if you forgot your password you can edit your password by clicking on forgot password option. From there you will be redirected to OTP verification page. An OTP will be send to your registered Email. You have to enter valid OTP and after OTP verification you will be redirected to Change password page. There you can change your password. After changing the password you will redirected again to the password verification page and there you will have to enter your new password.
3. After password Verification you will be redirect to you dashboard and there you can see your existing tasks, and can create new task by clicking on Create button. And Can edit and delete the Existing Task. Tasks are arranged on basis of Priority.
---


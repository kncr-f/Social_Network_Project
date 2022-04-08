# Social_Network_Project

This is a Social Network Platform where users can register, log in, update their profile information, chat each other, delete their Account.

## Overview
The project presents an online communication platform which users can make friends request to others. 
They can also accept or reject the friend requests. All possibilities (make a friend request, accept, cancel or pending status) can be seen both of side at the same time. 
There is a chat room feature the users can click a link and start to chat each other. 

## Features
  
-First name, last name, email and password are all required fields. If a login user can not remember the password, user can click a forgot password link.
 With the help of amazon SES a varification code can be sent to user's email and if it is typed correctly, user can reset the password.
 
-Visitors can see recent users and also search by user name. If they click an other users profile they can see mutual friends, if there is.

-Users can upload a profile image with the halp of amazon S3.

-Users can delete their profile picture with an confirmation pop up. If they delete their account their profile pictures are deleted automatically from amazon servers.
 

## Technology Stack
 <span><img src="https://img.shields.io/badge/PostgreSQL-fuchsia?style=for-the-badge&logo=postgresql&logoColor=white"></span>
 <span><img src="https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=white"></span>
 <span><img src="https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white"></span>
 <span><img src="https://img.shields.io/badge/Redux-purple?style=for-the-badge&logo=redux&logoColor=white"></span>
 <span><img src="https://img.shields.io/badge/Express-lightgrey?style=for-the-badge&logo=express&logoColor=white"></span>
 <span><img src="https://img.shields.io/badge/NodeJS-brightgreen?style=for-the-badge&logo=nodedotjs&logoColor=white"></span>
 <span><img src="https://img.shields.io/badge/Socket.IO-blueviolet?style=for-the-badge&logo=socketio&logoColor=white"></span>
 <span><img src="https://img.shields.io/badge/S3-red?style=for-the-badge&logo=amazon&logoColor=white"></span>
 <span><img src="https://img.shields.io/badge/SES-orange?style=for-the-badge&logo=amazon&logoColor=white"></span>
 <span><img src="https://img.shields.io/badge/bcrypt-brown?style=for-the-badge&logo=bcrypt&logoColor=white"></span>
  
  
  
  
## Preview
  
   **_Registration & Login & Profile Pages**
  
<img src="client/public/social_register_login.gif">
  
  <br>
  
  **_Create new User & Upload Image**
  
<img src="client/public/social_create_new_user_upload_image.gif">
  
  <br>
  
 **_Find Friends_**
  
<img src="client/public/social_find_people.gif">
  
  <br>
  
 **_Friend Requests_**
  
 <img src="client/public/social_make_accept_friend_request.gif">
  
 <br>
  
 **_Friend Requests_**
  
 <img src="client/public/social_friend_requests.gif">
  
 <br>
  
 **_Unfriend & Mutual Friends Features_**
  
 <img src="client/public/social_unfriend_mutual_friend.gif">
  
 <br>
  
 **_Chat Feature_**
  
 <img src="client/public/social_chat_feature.gif">
  
 <br>
  
 **_Edit Bio_**
  
 <img src="client/public/social_bio_add_edit.gif">
  
 <br>
  
 **_Delete Account Feature_**
  
<img src="client/public/social_chat_delete_account.gif">
  



  

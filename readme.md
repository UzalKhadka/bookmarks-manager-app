bookmarks-manager
A Portal to allow users to save, organize, import and export bookmarks where users must be able to store their bookmarks privately or share it publicly.

1. To install the required dependencies:

   1. go to the root directory 'bookmark-manager/' and enter 'npm install' to install the required dependencies for backend
   2. go to the directory 'bookmark-manager/frontend' and enter 'npm install' to install the required dependencies for frontend

2. To launch the web app:

   1. go to the root directory 'bookmark-manager/' and enter 'npm run app' to launch both frontend and backend servers
      OR
   2. go to the root directory 'bookmark-manager/' and enter 'npm run frontend-server' to launch the frontend server and
   3. go to the root directory 'bookmark-manager/' and enter 'npm run backend-server' to launch the backend server

3. To view all the data stored in the cloud database

   1. goto http://localhost:5000/ to view the server and the data in http://localhost:5000/api/users/

4. To view the database in the mongoDB,
   1. open MongoDB Compass,
   2. copy and paste
      mongodb+srv://bookmarks-manager:bookmarks12345@cluster0.wl7jm.mongodb.net/bookmarks-manager?authSource=admin&replicaSet=atlas-pjtfmc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
   3. then click connect
   4. then goto bookmarks-manager

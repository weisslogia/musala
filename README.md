# Musala Javascript Test
This project was created with:
- [Vitejs] - Frontend app generator
- [React] - HTML enhanced for web apps!
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework

## Available Scripts
Before you are able to run the app you need to install the dependencies
```sh
cd path_of_the_cloned_app
npm install
npm install --prefix ./api
npm install --prefix ./frontend
```
Once the dependencies are installed we proceed to build the projects
```sh
npm run build --prefix ./api
npm run build --prefix ./frontend
```
Then we just start the projects
```sh
npm start
```
If everything work fine, you should see something like this and you can enter the site with the URL listed in the image below
![alt text](https://res.cloudinary.com/dlhwybwvv/image/upload/v1681195252/Screenshot_20230411_024042_nqk7fs.png)

## Run API and Frontend 
### Run the API
The api use an environment file for its configurations, you can provide that file if you don't it will use the default values 

`PORT=3000` default value is 4000
`MONGO_URL=<mongodb_connection_url>` default is in memory database

you need to install the dependencies

```sh
cd api
npm install
```

for development you can run the app like this
```sh
npm run dev
```
for run as a service you can run it like this
```sh
npm run build
npm run start
```
### Run the Frontend
The frontend use an configuration file for its configurations it is filled with the default configuration `./frontend/src/config/config.ts` in this file is `API_URL` variable with the url of the api, you most to configure it before running the app if the url or port was changed
you need to install the dependencies

```sh
cd frontend
npm install
npm run preview
```
## Run the tests
### API tests
The tests where made with mochajs
```sh
cd api
npm install
npm run test
```
## Run with Docker

```sh
docker build . -t <user>/musala-gateway
docker run -p 8080:8080 -p 4000:4000 -d <user>/musala-gateway
```
watch the logs in order to wait the app boot
copy the container id from the commando below
```sh
docker ps
docker logs <container_id>
```
   [express]: <http://expressjs.com>
   [React]: <https://react.dev/>
   [node.js]: <http://nodejs.org>
   [vitejs]: <https://vitejs.dev/>

# eventbright

<br />

<div align="center">
  <a href="event-bright.herokuapp.com">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Eventbrite_Logo.svg/2560px-Eventbrite_Logo.svg.png" alt="Logo">
  </a>
  <p align="center">Welcome to Eventbright, an Eventbrite clone...</p>
</div>

## Wiki
[Eventbright](httpd://event-bright.herokuapp.com/)

## Built With
<ul>
  <li><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' alt='JS' width='40' height='40'></li>
  <li><img src='https://cdn-icons-png.flaticon.com/512/732/732212.png' alt='HTML' width='40' height='40'></li>
  <li><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png' alt='CSS' width='40' height='40'></li>
  <li><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' alt='React' width='40' height='40'></li>
  <li><img src='https://e7.pngegg.com/pngimages/669/447/png-clipart-redux-react-javascript-freecodecamp-npm-others-miscellaneous-purple-thumbnail.png' alt='Redux' width='40' height='40'></li>
  <li><img src='https://mpng.subpng.com/20180425/jrw/kisspng-node-js-javascript-web-application-express-js-comp-5ae0f84e2a4242.1423638015246930701731.jpg' alt='NodeJS' width='40' height='40'></li>
  <li><img src='https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png' alt='Express' width='40'></li>
  <li><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png' alt='SQL' width='40' height='40'></li>
  <li><img src='https://opencollective-production.s3.us-west-1.amazonaws.com/566dd3f0-27a8-11ec-9a5a-0519330cdfea.png' alt='Sequelize' width='40' height='40'></li>
  <li><img src='https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png' alt='.gitignore' width='40' height='40'></li>
  <li><img src='https://user-images.githubusercontent.com/674621/71187801-14e60a80-2280-11ea-94c9-e56576f76baf.png' alt='VSCode' width='40' height='40'></li>
</ul>

## Getting Started

1. Clone the repo
   ```sh
   git clone https://github.com/twincarlos/eventbright.git
   ```
2. Install dependencies in your backend and fronend directories.
   ```sh
   npm install
   ```
3. Create a .env file in your backend direcotry and paste the code found in your .env.example file.
4. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
   ```sh
   CREATE USER <name> WITH CREATEDB PASSWORD <password>
   ```
5. Enter the username, password, and database you created into your .env file, a JWT_SECRET token, and your desired PORT (preferably 5000).
6. Add the following proxy to your package.json file within your frontend directory, replacing or keeping the 5000 port to match your PORT configuration found in your .env file.
   ```sh
   "proxy": "http//localhost:5000"
   ```
7. Create Database, Migrate, and Seed models.
   ```sh
   npx dotenv sequelize db:greate
   npx dotenv sequelize db:migrate
   npx dotenv sequelize db:seed:all
8. Run npm start in your backend directory, as well as in your frontend directory.
9. You can login as a Demo user or sign up for an account to enjoy all the functionalities of **Airbnb Deluxe**

<!-- CONTACT -->
## Contact

githup: [@twincarlos](https://github.com/twincarlos) - twincarlos98@gmail.com

Project Link: [https://github.com/twincarlos/eventbright](https://github.com/twincarlos/eventbright)

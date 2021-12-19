const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// helper function
const helpers = require('./utils/helpers');

// handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

// session (connects session to sequelize Database)
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Creates the session
const sess = {
    secret: "super super secret",
    cookie: { originalMaxAge: 600000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));

//Sets handlebars as default
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

//Turns on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
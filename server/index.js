const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/index.js');
const passport = require('passport');
const helpers = require('./helpers.js');//eslint-disable-line
require('../server/config/passport')(passport);

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: process.env.SESSION_PASSWORD || 'supersecretsecret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.post('/', (req, res) => {
  res.end();
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // throw err;
      res.status(500).send(err);
    }
  });
  res.end();
});

app.post('/register/artist', async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const registration = await db.registerArtist(req.body.username, hash, req.body.email, req.body.city, req.body.state);
  if (registration === 'username already exists') {
    return res.send('username already exists');
  } if (registration === 'email already exists') {
    return res.send('email already exists');
  }
  // helpers.sendEmail(req.body.username, req.body.email)
  const user = await db.getUser(req.body.username);
  req.login(user[0], () => {
    console.log(req.sessionId);
    res.send(user);
  });
});

app.post('/register/venue', async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const registration = await db.registerVenue(req.body.username, hash, req.body.email, req.body.venueName, req.body.address, req.body.city, req.body.state, req.body.capacity);//eslint-disable-line
  if (registration === 'username already exists') {
    return res.send('username already exists');
  } if (registration === 'username already exists') {
    return res.send('email already exists');
  }
  // helpers.sendEmail(req.body.username, req.body.email)
  const user = await db.getUser(req.body.username);
  req.login(user[0], () => {
    console.log(req.sessionId);
    res.send(user);
  });
});

app.post('/login', async (req, res) => {
  const userInfo = await db.checkCredentials(req.body.username);
  if (userInfo.length) {
    const checkUser = userInfo[0];
    if (bcrypt.compareSync(req.body.password, checkUser.password)) {
      const user = await db.getUser(req.body.username);
      req.login(user[0], () => {
        console.log(req.sessionId);
        res.send(user);
      });
    } else {
      res.send('your passwords dont match');
    }
  } else {
    res.send('Username does not exist');
  }
});

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

app.get('/isloggedin', async (req, res) => {
  console.log('current passport session:', req.session.passport);
  if (req.session.passport && req.session.passport.user) {
    const userInfo = await db.getUser(req.session.passport.user.username);
    res.send(userInfo);
  } else {
    res.send();
  }
});

app.get('/logout', (req, res) => {
  res.send();
});

/** ****************************** Calendar ********************************** */
app.post('/calendar', async (req, res) => {
  await db.addBooking(req.body);
  res.status(200).end();
});

app.get('/artist/epk', async (req, res) => {
  console.log(req.query.username);
  const epkInfo = await db.getEpkData(req.query.username);
  res.json(epkInfo);
});

app.get('/artist/city', async (req, res) => {
  const artistList = await db.getArtistsByCity(req.query.city);
  res.json(artistList);
});

app.get('/venues', async (req, res) => {
  const { city } = req.query;
  const venues = await db.getVenues(city);
  res.status(200).send({ venues });
});

app.get('/venueCalendar', async (req, res) => {
  const { venue_id } = req.query;
  const venueCalendar = await db.getVenueBookings2(venue_id);
  res.status(200).send(venueCalendar);
});

app.patch('/booking', async ({ body }, res) => {
  await db.updateBooking(body);
  const bookings = await db.getVenueBookings2(body.venue_id);
  res.status(200).send({ bookings });
});

app.post('/epkImgUpload', async (req, res) => {
  res.status(200).send();
});

app.post('/updateEPK', async (req, res) => {
  console.log('hit server updateEPK');
  db.editEPK(req.body);
  res.status(200).send();
});

app.get('/epk', async (req, res) => {
  const epk = await db.getEpk(req.query.artistId);
  res.status(200).send({ epk });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000!');
});

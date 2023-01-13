require('dotenv/config');
// const path = require('path');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// const publicPath = path.join(__dirname, 'public');

const app = express();

const jsonMiddleware = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/list/:destination', (req, res, next) => {
  if (!req.params.destination) {
    throw new ClientError(400, 'Please put a valid location');
  } else {
    fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.params.destination}&inputtype=textquery&fields=formatted_address,name,geometry,photo,place_id&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`)
      .then(res => res.json())
      .then(location => fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.candidates[0].geometry.location.lat},${location.candidates[0].geometry.location.lng}&radius=100000&type=establishment&keyword=attraction&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8&rankby=prominence`))
      .then(res => res.json())
      .then(around => res.send(around))
      .catch(err => next(err));
  }
});

app.get('/api/attraction/:id', (req, res, next) => {
  if (!req.params.id) {
    throw new ClientError(400, 'this location is not avalible');
  } else {
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&fields=formatted_address,name,photo,review,rating,opening_hours,website&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`)
      .then(res => res.json())
      .then(detail => res.send(detail))
      .catch(err => next(err));
  }
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { account, password } = req.body;
  if (!account || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("userName", "hashedPassword")
        values ($1, $2)
        returning "userId", "userName"
      `;
      const params = [account, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/log-in', (req, res, next) => {
  const { account, password } = req.body;
  if (!account || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "userName" = $1
  `;
  const params = [account];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, account };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

/* ⛔ Every route after this middleware requires a token! ⛔ */

app.use(authorizationMiddleware);

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.post('/api/fav/upload', (req, res, next) => {
  const { placeId, userId } = req.body;
  if (!placeId || !userId) {
    throw new ClientError(400, 'info error');
  }
  const sql = `
  insert into "favoriteList" ("userId", "placeId")
  values ($1, $2)
  returning "favoriteId", "placeId"
  `;
  const params = [userId, placeId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

// app.get('/api/photos/:photo', (req, res) => {
//   if (req.params.photo === 'undefined') {
//     const erroeMessage = { error: 'Please put a valid location' };
//     res.status(400).json(erroeMessage);
//   } else {
//     // console.log(req.params.photo);
//     fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${req.params.photo}&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`)
//       .then(response => response.blob())
//       .then(imageBlob => {
//         // Then create a local URL for that image and print it
//         const imageObjectURL = URL.createObjectURL(imageBlob);
//         res.send(imageObjectURL);
//         console.log(imageObjectURL);
//       })
//       // .then(photo => console.log('the photo is' + photo))
//       .catch(err => console.error(err));
//   }
// });

// fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.params.destination}&inputtype=textquery&fields=formatted_address,name,geometry,photo,place_id&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`)
//   .then(res => res.json())
//   .then(location =>
//     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.candidates[0].geometry.location.lat},${location.candidates[0].geometry.location.lng}&radius=100000&type=establishment&keyword=attraction&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8&rankby=prominence`)
//       .then(res => res.json())
//       .then(around => res.send(around))
//       .catch(err => next(err)))
//   .catch(err => next(err));

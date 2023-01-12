require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const app = express();

app.use(staticMiddleware);

app.get('/api/list/:destination', (req, res) => {
  if (req.params.destination === 'undefined') {
    const erroeMessage = { error: 'Please put a valid location' };
    res.status(400).json(erroeMessage);
  } else {
    fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.params.destination}&inputtype=textquery&fields=formatted_address,name,geometry,photo,place_id&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`)
      .then(res => res.json())
      .then(location =>
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.candidates[0].geometry.location.lat},${location.candidates[0].geometry.location.lng}&radius=100000&type=establishment&keyword=attraction&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8&rankby=prominence`)
          .then(res => res.json())
          .then(around => res.send(around))
          .catch(err => console.error(err)))
      .catch(err => console.error(err));
  }
});

app.get('/api/attraction/:id', (req, res) => {
  if (req.params.id === 'undefined') {
    const erroeMessage = { error: 'Please put a valid location' };
    res.status(400).json(erroeMessage);
  } else {
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&fields=formatted_address,name,photo,review,rating,opening_hours,website&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`)
      .then(res => res.json())
      .then(detail => res.send(detail))
      .catch(err => console.error(err));
  }
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

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

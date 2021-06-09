/* eslint-disable no-console */
const path = require('path');
const express = require('express');

const app = express();

const PORT = 8080;
const DIST_FOLDER = path.resolve(__dirname, 'dist');

app.use((req, res, next) => {
  if (req.url === '/index.html') res.redirect('/');

  next();
});

app.use(express.static(DIST_FOLDER));

app.get('*', (req, res) => res.sendFile(`${DIST_FOLDER}/index.html`));

app.listen(PORT, () => {
  console.log(`App listening to http://127.0.0.1:${PORT} || http://localhost:${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

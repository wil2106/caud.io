const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const apiRouter = require('./routes/routes.js')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
     extended: true
}));

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.use('/api/', apiRouter)

app.listen(process.env.PORT || config.port, () => console.log('App listening on port '+ config.port));

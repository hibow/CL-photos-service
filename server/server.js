require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3005;
const cors = require('cors');
const morgan = require('morgan');
const controller = require('../controllers/index.js');
app.use(express.static(__dirname + './../dist'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

app.use('/products/:id', express.static(__dirname + '/../dist'));

//read five photos for specific product id
app.get('/product/:id', controller.get);
//post 1 photo for specific product tag, it won't update if tagId exists
app.post('/product/:id/:ptag', controller.post);
//update username of 5 photos for specific product id
app.put('/product/:id/:user', controller.update);
//delete 1 photo for specific product id
app.delete('/product/:id', controller.delete);


app.listen(port, () => {
  console.log('Listening on port ' + port)
})
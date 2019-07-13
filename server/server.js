const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./../database/db.js');
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

// app.get('/product/:id', (req, res) => {
//   dbConnection.queryDB(req.params.id, (result) => {
//     res.send(result);
//   });
// });

//read five photos for specific product id
app.get('/product/:id', controller.get);
//post five photo for specific product tag, it won't update if tagId exists
app.post('/product/:id/:ptag', controller.post);
//update username of all photos for specific product id
app.put('/product/:id/:user', controller.update);
//delete all photo for specific product id
app.delete('/product/:id', controller.delete);

app.get('/data/grab', (req, res) => {
  dbConnection.connection.query('SELECT * FROM photos', (err, data) => {
    if(err){return console.log(err, 'err')}
    res.send(data);
  })
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
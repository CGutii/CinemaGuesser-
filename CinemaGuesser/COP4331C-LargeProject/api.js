require('express');
require('mongodb');
const axios = require("axios");
var sha256 = require('js-sha256');
exports.setApp = function ( app, client )
{
    
    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: firstName, lastName, error
      // Hello test
     var error = '';
    
      const { login, password } = req.body;
      const hash = sha256.hmac('key', password);

      const db = client.db();
      const results = await db.collection('Users').find({Login:login,Password:hash}).toArray();
    
      var fn = '';
      var ln = '';
      var err = 'invalid login';
    
      if( results.length > 0 )
      {
        fn = results[0].FirstName;
        ln = results[0].LastName;
        err = '';
      }
    
      var ret = { firstName:fn, lastName:ln, error: err};
      res.status(200).json(ret);
    });
    
    //Written by Casey
    app.post('/api/register', async (req, res, next) =>
    {
      var error = '';
      const { FirstName, LastName, Login, Pass } = req.body;
      const Password = sha256.hmac('key', req.body.Password);
      const db = client.db();

      const results = await

      db.collection('Users').insertOne({FirstName, LastName, Login, Password});
      //change here to not reveal hashed password
      var ret = {firstname:FirstName, lastname: LastName, login: Login, password:Password};
      res.status(200).json(ret);
    });

    app.post('/api/movies', async (req, res, next) =>
    {
      var ret = await makeGetRequest(req.body.search);
      res.status(200).json(ret);
    });

    function makeGetRequest(search) {
      return new Promise(function (resolve, reject) {
          axios.get(`http://www.omdbapi.com/?apikey=${process.env.APIKEY}&`, {
            params : {
              t: search
            }
          }).then(
              (response) => {
                  var result = response.data;
                  console.log('Processing Request');
                  resolve(result);
              },
                  (error) => {
                  reject(error);
              }
          );
      });
  }//end of function
    
}
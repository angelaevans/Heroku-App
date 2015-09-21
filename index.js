var express = require('express');
var app = express();

var pg = require('pg');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/db', function (request, response) {
  var connectStr = "postgres://hhlorjpztogkxd:_jYL2Fa1mJSepcyKvJk8_S1WJ2@ec2-46-137-159-123.eu-west-1.compute.amazonaws.com:5432/d6q5sdg1cfttg7"
  console.log(process.env);
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   client.query('SELECT * FROM caught_users', function(err, result) {
      done();
      if(err) return console.error(err);
      console.log(result.rows);
		});
	});
  /*pg.connect(connectStr, function(err, client, done) {
    client.query('SELECT * FROM caught_users', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });*/
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



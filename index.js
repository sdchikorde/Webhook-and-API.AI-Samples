"use strict";
const pg = require('pg');
const connectionString = "postgres://zvcvhvet:x5Z4Ckk96wGPFfnYd7HaueGLkmeHHsoX@tantor.db.elephantsql.com:5432/zvcvhvet?ssl=true";
const express = require("express");
const bodyParser = require("body-parser");
//if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
//}


let connString = 'postgres://zvcvhvet:x5Z4Ckk96wGPFfnYd7HaueGLkmeHHsoX@tantor.db.elephantsql.com:5432/zvcvhvet';//process.env.DATABASE_URL || 'postgres://yvqbkjfwvnsivz:2815ee936cbf48b4f1ac0371a32562a0e7524a14efd66ee65d42e2cddfa06d41@ec2-54-83-8-246.compute-1.amazonaws.com:5432/d7t8km65vgrgpt';
const Pool = require('pg-pool');
const url = require('url')
 
const params = url.parse(connString);
const auth = params.auth.split(':');
 
const config = {
  user: 'zvcvhvet',
  password: 'x5Z4Ckk96wGPFfnYd7HaueGLkmeHHsoX',
  host: 'tantor.db.elephantsql.com',
  port: '5432',
  database: 'zvcvhvet',
  ssl: true
};
 
const pool = new Pool(config);
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var intent = 
	req.body.queryResult &&
	req.body.queryResult.intent &&
	req.body.queryResult.intent.DisplayName 
		? req.body.queryResult.intent.DisplayName
		: "intent not picked"
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";

  console.log("intent :" + intent)
  console.log("text :" + speech)
  sendCard(req,res)
});

function sendCard(req, res){
	var cardTitle = 'test'
	var cardSubTitle = 'test'
	var buttonText = 'button';
	/*pg.connect(connectionString, function(err, client, done) {
	if(!err){
	   client.query('SELECT table_schema,table_name FROM information_schema.tables', function(err, result) {
			done();
			if(err) console.error(err);
			console.log(JSON.stringify(result.rows));
			return res.json({
				fulfillmentText: cardTitle,
				fulfillmentMessages: [
					{
					  card: {
						title: cardTitle,
						subtitle: cardSubTitle,
						imageUri: "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
						buttons: [
						  {
							text: buttonText,
							postback: "https://assistant.google.com/"
						  }
						]
					  }
					}
				],
				source: "webhook-echo-sample"
			}); 
	   });
	}
	else{
		console.error(err);
	}
	});*/
	/*pool.connect(function(err, client, done) {

		if (err) {
			console.error('Error connecting to pg server' + err.stack);
			callback(err);
		} else {
			console.log('Connection established with pg db server');

			client.query("SELECT table_schema,table_name FROM information_schema.tables", (err, res) => {

					if (err) {
						console.error('Error executing query on pg db' + err.stack);
						callback(err);
					} else {
						console.log('Got query results : ' + res.rows.length);


					   async.each(res.rows, function(empRecord) {   
								console.log(empRecord.table_name);
						});
					}
					client.release();

				});
		}

	});  */
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect("mongodb://apachacker:apachacker1@ds111244.mlab.com:11244/apachackathon", function (err, db) {
	   
		 if(err) throw err;
		console.log("Success :)");
		 //Write databse Insert/Update/Query code here..
					
	});
	return res.json({
		fulfillmentText: cardTitle,
		fulfillmentMessages: [
			{
			  card: {
				title: cardTitle,
				subtitle: cardSubTitle,
				imageUri: "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
				buttons: [
				  {
					text: buttonText,
					postback: "https://assistant.google.com/"
				  }
				]
			  }
			}
		],
		source: "webhook-echo-sample"
	});
}


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

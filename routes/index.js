var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Helloworld page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Helloworld!' })
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* GET Adds Power data to DB */
router.get('/senddata', function(req, res) {
	console.log(res.send(req.query));
	//res.send('power: ' + req.query.power);

	//Get date & time
	var datetime = new Date()

	//Set our internal DB variable
	var db = req.db;

	//Get our power usage values
	var power = req.query.power;
	
	//Set out collection
	var collection = db.get('powerdata');

	//Submit power value to db
	collection.insert({
	"kw" : power,
	"time" : datetime
	}, function (err, doc) {
		if (err) {
            	// If it failed, return error
            	res.send("There was a problem adding the information to the database.");
        	}
        	else {
		// If it worked, set the header so the address bar doesn't still say /senddata
		// res.location("powerdata");
		// And forward to success page
		//res.redirect("powerdata");
		}
 	});
});

router.get('/senddatah', function(req, res) {
    console.log(res.send(req.query));
    //res.send('power: ' + req.query.power);

    //Get date & time
    var datetime = new Date()

    //Set our internal DB variable
    var db = req.db;

    //Get our power usage values
    var humid = req.query.humid;

    var humid2 = humid / 1023 * 5.0;

    var humid3 = ( 161.0 * humid2 / 5 ) - 25.8;

    var humid4 = humid3 / ( 1.0546 - 0.00216 * 25 );

    var humid5 = humid4.toFixed(2);
    
    //Set out collection
    var collection = db.get('humiddata');

    //Submit power value to db
    collection.insert({
    "h" : humid,
    "time" : datetime,
    "h2" : humid5
    }, function (err, doc) {
        if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
        // If it worked, set the header so the address bar doesn't still say /senddata
        // res.location("powerdata");
        // And forward to success page
        //res.redirect("powerdata");
        }
    });
});

/* GET Powerdata page. */
router.get('/powerdata', function(req, res) {
    var db = req.db;
    var collection = db.get('powerdata');
    collection.find({},{},function(e,docs){
        res.render('powerdata', {
            "powerdata" : docs
        });
    });
});


router.get('/powerdatalist', function(req, res) {
    var db = req.db;
    var collection = db.get('powerdata');
    //collection.find().sort({_id:-1},{limit:30 },function(e,docs){
    collection.find({},{ 'sort' : [[ 'time',-1]], 'limit' : 30 },function(e,docs){    
    //wrong collection.find().limit(30, function(e, docs) {
        res.json(docs);
    });
});

router.get('/chart', function(req, res) {
    res.render('chart', { title: 'Chart v1' });
});

router.get('/humiddatalist', function(req, res) {
    var db = req.db;
    var collection = db.get('humiddata');
    //collection.find().sort({_id:-1},{limit:30 },function(e,docs){
    collection.find({},{ 'sort' : [[ 'time',-1]], 'limit' : 30 },function(e,docs){    
    //wrong collection.find().limit(30, function(e, docs) {
        res.json(docs);
    });
});

router.get('/humiddatalast', function(req, res) {
    var db = req.db;
    var collection = db.get('humiddata');
    //collection.find().sort({_id:-1},{limit:30 },function(e,docs){
    collection.find({},{ 'sort' : [[ 'time',-1]], 'limit' : 1 },function(e,docs){    
    //wrong collection.find().limit(30, function(e, docs) {
        res.json(docs);
    });
});

router.get('/chart', function(req, res) {
    res.render('chart', { title: 'Chart v1' });
});

router.get('/humidchart', function(req, res) {
    res.render('humidchart', { title: 'HumidChart v1' });
});

module.exports = router;
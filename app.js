////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//excel to json
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

//mongo connect
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//http;//example/json
var njson = ''

//so file 
var excelName = '';


app.use('/img', express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/img'));



app.use(bodyParser.json());

var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
		cb(null, './uploads/')
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		cb(null, file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
	}
});

var upload = multer({ //multer settings
	storage: storage,
	fileFilter: function (req, file, callback) { //file filter
		if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
			return callback(new Error('Wrong extension type'));
		}
		callback(null, true);
	}
}).single('file');

/** API path that will upload the files */
app.post('/upload', function (req, res) {
	var exceltojson;
	upload(req, res, function (err) {
		if (err) {
			res.json({ error_code: 1, err_desc: err });
			return;
		}
		/** Multer gives us file info in req.file object */
		if (!req.file) {
			res.json({ error_code: 1, err_desc: "No file passed" });
			return;
		}
		/** Check the extension of the incoming file and 
		 *  use the appropriate module
		 */
		if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
			exceltojson = xlsxtojson;
		} else {
			exceltojson = xlstojson;
		}
		try {
			exceltojson({
				input: req.file.path,
				output: null,
				//since we don't need output.json
				lowerCaseHeaders: true
			}, function (err, result) {
				if (err) {
					return res.json({ error_code: 1, err_desc: err, data: null });
				}

				function islem2(req, res) {
					islem3()
					if (1 == 0) {
						console.log('data not saved')
					} else {
						//Write        
						MongoClient.connect(url, function (err, db) {
							if (err) throw err;
							var dbo = db.db("excelFiles");
							//insert
							dbo.collection(excelName).insertMany(result, function (err, res) {
								if (err) throw err;
								console.log('data saved')
								db.close();
							});
						});
					}
				}
				function islem() {

					let date_ob = new Date();

					// current date
					// adjust 0 before single digit date
					let date = ("0" + date_ob.getDate()).slice(-2);

					// current month
					let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

					// current year
					let year = date_ob.getFullYear();

					// current hours
					let hours = date_ob.getHours();

					// current minutes
					let minutes = date_ob.getMinutes();

					// current seconds
					let seconds = date_ob.getSeconds();
					//console.log(year + month + date + hours + minutes + seconds);

					excelName = year + month + date + hours + minutes + seconds

					//   res.redirect('http://localhost/json/jsonlistele.php?link=http://165.227.148.66/json&dosya='+excelName)
					res.json(result);
					setTimeout(function () {
						njson = result
					}, random);
					islem2();
				}
				islem();
				function islem3() {
					//Read        
					MongoClient.connect(url, function (err, db) {
						if (err) throw err;
						var dbo = db.db("excelFiles");
						//Find all documents in the customers collection:
						dbo.collection(excelName).find({}).toArray(function (err, result) {
							if (err) throw err;
							// console.log(result);

							db.close();
						});
					});
				}


			});
		} catch (e) {

			//Corupted excel file
			res.json({ error_code: 1, err_desc: "bozuk dosya" });
		}
	})

});
var random = Math.floor(Math.random() * 600) + 100
app.get('/json', function (req, res) {
	setTimeout(function () {
		res.send(njson)
	}, random);
});

app.get('/excel', function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/hello.html");
});

app.get('/dataPolicy', function (req, res) {
	res.sendFile(__dirname + "/Data_Policy.html");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//mail
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Transportauftrag
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/Transportauftrag';
//mongo on
const mongoose = require('mongoose');
const { json } = require("body-parser");
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
})

app.use(bodyParser.json());
app.use(express.static('public/index'));
app.use(bodyParser.urlencoded({
	extended: true
}));
//get index
app.get('/Transportauftrag', function (req, res) {
	res.set({
		'Access-control-Allow-Origin': '*'
	});
	return res.redirect('index.html');
}).listen(3000)

// app.get('/transportauftrag',function(req,res){
//     res.sendFile(__dirname + "/trans.html");
// });
//send on
app.post('/send', function (req, res) {

	if (req.body.adresTrain != null) {
		var adresValid1 = req.body.adresTrain
	}
	if (req.body.adresTruck != null) {
		var adresValid2 = req.body.adresTruck
	}

	if (req.body.adresTrain == null) {
		return res.send('<h1 style="color:red;"> Train SIRKET BULUNAMADI!</h1>')
	}
	if (req.body.adresTruck == null) {
		return res.send('<h1 style="color:red;"> Truck SIRKET BULUNAMADI!</h1>')
	}

	var UnternehmenTrain = req.body.UnternehmenTrain;
	var UnternehmenTruck = req.body.UnternehmenTruck;
	var adres1 = adresValid1;
	var adres2 = adresValid2;
	var Schiff = req.body.Schiff;
	var Reederei = req.body.Reederei;
	var ETD = req.body.ETD;
	var POL = req.body.POL;
	var POD = req.body.POD;
	var Closing = req.body.Closing;
	var Equipment = req.body.Equipment;
	var Container = req.body.Container;
	var Inhalt = req.body.Inhalt;
	var Gewicht = req.body.Gewicht;
	var Anlieferreferenz1 = req.body.Anlieferreferenz1;
	var Anlieferreferenz2 = req.body.Anlieferreferenz2;
	var Abnahmeterminal = req.body.Abnahmeterminal;
	var Abgabereferenz = req.body.Abgabereferenz;
	var Bahnversand = req.body.Bahnversand;
	var Anlieferung = req.body.Anlieferung;
	var Anlieferterminal = req.body.Anlieferterminal;
	var Verfügbarkeit = req.body.Verfügbarkeit;
	var Leerdepot = req.body.Leerdepot;
	var Pick = req.body.Pick;
	var Ladestelle = req.body.Ladestelle;
	var Ladereferenz = req.body.Ladereferenz;
	var Termin = req.body.Termin;
	var Rückliefer = req.body.Rückliefer;
	var Bemerkung1 = req.body.Bemerkung1;
	var Bemerkung2 = req.body.Bemerkung2;
	var secim = req.body.secim;



	//date on
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	today = dd + '/' + mm + '/' + yyyy;
	//date off


	//id on
	//baglan
	MongoClient.connect(url, (err, client) => {
		if (err) throw err;
		const db = client.db('Transportauftrag');
		let sorgu = {};
		db.collection('id').findOne(sorgu, (err, result) => {
			if (err) throw err;
			var id = result.id
			Nid(id)
			client.close();
		});
	});
	function Nid(id) {
		//id +1 update
		MongoClient.connect(url, (err, client) => {
			if (err) throw err;
			const db = client.db('Transportauftrag');
			let sorgu = { id: id };
			let yeniDeger = { $set: { id: id } };
			db.collection('id').updateOne(sorgu, yeniDeger, (err, result) => {
				if (err) throw err;
				client.close();
			});
		});
		todeyid = yyyy + '' + mm + '' + id;
		//id off
	
		var colNameAll = 'All'
		var colDataAll = {

			"adresTRUCK": adres1,
			"adresTRAIN": adres2,
			"Schiff": Schiff,
			"Reederei": Reederei,
			"ETD": ETD,
			"POL": POL,
			"POD": POD,
			"Closing": Closing,
			"Equipment": Equipment,
			"Container": Container,
			"Inhalt": Inhalt,
			"Gewicht": Gewicht,

			"Leerdepot": Leerdepot,
			"Pick": Pick,
			"Verfügbarkeit": Verfügbarkeit,
			"Ladestelle": Ladestelle,
			"Ladereferenz": Ladereferenz,
			"Termin": Termin,
			"Rückliefer": Rückliefer,
			"Anlieferreferenz1": Anlieferreferenz1,
			"Bemerkung1": Bemerkung1,

			"Abnahmeterminal": Abnahmeterminal,
			"Abgabereferenz": Abgabereferenz,
			"Bahnversand": Bahnversand,
			"Anlieferung": Anlieferung,
			"Anlieferterminal": Anlieferterminal,
			"Anlieferreferenz2": Anlieferreferenz2,
			"todeyid": todeyid,
			"Bemerkung2": Bemerkung2
		}


		var colName1 = 'Truck'
		var colData1 = {

			"adres": adres1,
			"Schiff": Schiff,
			"Reederei": Reederei,
			"ETD": ETD,
			"POL": POL,
			"POD": POD,
			"Closing": Closing,
			"Equipment": Equipment,
			"Container": Container,
			"Inhalt": Inhalt,
			"Gewicht": Gewicht,

			"Leerdepot": Leerdepot,
			"Pick": Pick,
			"Verfügbarkeit": Verfügbarkeit,
			"Ladestelle": Ladestelle,
			"Ladereferenz": Ladereferenz,
			"Termin": Termin,
			"Rückliefer": Rückliefer,
			"Anlieferreferenz": Anlieferreferenz2,

			"todeyid": todeyid,

			"Bemerkung": Bemerkung2
		}
		var colName2 = 'Train'
		var colData2 = {

			"adres": adres2,
			"Schiff": Schiff,
			"Reederei": Reederei,
			"ETD": ETD,
			"POL": POL,
			"POD": POD,
			"Closing": Closing,
			"Equipment": Equipment,
			"Container": Container,
			"Inhalt": Inhalt,
			"Gewicht": Gewicht,

			"Abnahmeterminal": Abnahmeterminal,
			"Abgabereferenz": Abgabereferenz,
			"Bahnversand": Bahnversand,
			"Anlieferung": Anlieferung,
			"Anlieferterminal": Anlieferterminal,
			"Anlieferreferenz": Anlieferreferenz1,

			"todeyid": todeyid,

			"Bemerkung": Bemerkung1
		}


		//TRAIN html on VALID
		var TrainPage = (
			'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><!-- Bootstrap CSS --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"><style> #hide {display: none;} input.input-box { background: #a9adb0; }.image {position: relative;width: 950px;}.col {padding-left: 0px !important;padding-right: 0px !important;}x {position: absolute;top: 10px;left: 10px;}</style></head><body>' +
			'</head><body><div class="container"><img src="./img/Logo.png" width="400" height="200" class="rounded float-right"><br><br>' +
			'<input disabled rows="1" cols="30"  value="' +
			UnternehmenTrain +
			'"><br><input disabled cols="50" weight="30"  type="text"  size="30" value="' +
			adres1 +
			'"><br>' +
			'<br><br><h1>TRANSPORTAUFTRAG</h1><label for="fname">Unsere Position:</label>' +
			todeyid +
			'</label>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<label>Datum: </label>' +
			today +
			'<br><p>Sehr geehrte Damen und Herren,</p>' +
			'<p>hiermit beauftragen wir Sie mit folgendem Transport:</p><br><br>' +
			'<div class="image"><img src="./img/grey.jpg" height="200px" width="950px" /> <x><div style="width: 950px;"><div class="row" style="width: 950px; margin-left: 15px;"><div class="col"><br><div class="row">schif</div><div class="row"><input disabled  class="input-box" size="20" value="' +
			Schiff +
			'"></div><br><div class="row">equipment</div><div class="row"><input  disabled class="input-box" size="20" value="' +
			Equipment +
			'"></div></div><div class="col"><div class="row"><div class="col"><br>reederei<input  disabled class="input-box" size="10" value="' +
			Reederei +
			'"></div><div class="col"><br>etd<br><input  disabled class="input-box" size="9" value="' +
			ETD +
			'"></div></div><div class="row"><br>container</div><div class="row"><input  disabled class="input-box" size="20" value="' +
			Container +
			'"></div></div><div class="col"><div class="row"><div class="col"><br>pol<br><input  disabled class="input-box" size="12" value="' +
			POL +
			'"></div><div class="col"><br>pod<br><input  disabled class="input-box" size="9" value="' +
			POD +
			'"></div></div><div class="row"><br>inhalt</div><div class="row"><input  disabled class="input-box" size="20" value="' +
			Inhalt +
			'"></div></div><div class="col"><div class="row"><br>closing</div><div class="row"><input  disabled class="input-box" size="15" value="' +
			Closing +
			'"></div><div class="row"><br>gewicht</div><div class="row"><input disabled  class="input-box" size="15" value="' +
			Gewicht +
			'"></div></div></div></div></x></div>' +
			'<br><br><br><br><br><div class="container"><div class="row" style="width: 901px;"><div class="col-3">Abnahmeterminal:</div><div class="col-9"><input  disabled style="width: 725px;"  value="' +
			Abnahmeterminal +
			'"></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Abgabereferenz</div><div class="col-9"><input  disabled style="width: 725px;"value="' +
			Abgabereferenz +
			'"><br><br></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Bahnversand:</div><div class="col-9"><input  disabled style="width: 725px;"  value="' +
			Bahnversand +
			'"></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Anlieferung:</div><div class="col-9"><input  disabled style="width: 725px;"value="' +
			Anlieferung +
			'"><br><br></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Anlieferterminal:</div><div class="col-9"><input  disabled style="width: 725px;"value="' +
			Anlieferterminal +
			'"></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Anlieferreferenz1:</div><div class="col-9"><input  disabled style="width: 725px;"value="' +
			Anlieferreferenz1 +
			'"><br><br></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Bemerkung:</div><div class="col-9"><textarea  disabled style="width: 725px;">' +
			Bemerkung1 +
			'</textarea><br><br></div></div><br><p>Frau Sibel Firat | Telefon:040 30727799 | Fax: 040 30723335 | Mail:sibel@aigorithmus.com <br>AI Gorithmus OÜ| Ahtri 12 10151 Tallinn Estonia | Register-Number: 16079086 | VAT-ID: |CEO: Nima Matini, SibelFirat <br>Wirarbeiten ausschließlich auf Grundlage unserer Allgemeinen Geschäftsbedingungen.</p><br><br><br><br><br><br><br><br><br><br><br><br><input class="rounded float-right" type="submit" value="PRINT" onclick="window.print()">' +
			'<form class="contact100-form validate-form" action="/sendtrain" method="post">' +
			'<input  disabled name="sil" id="sil" type="hidden" value="sil">' +
			'<button action="post">sil</button>' +
			'</form>' +
			'</div></body></html><!-- ahmet can canturk --></div> <p id="demo"></p> <script>function myFunction() {document.getElementById("demo").innerHTML = "Hello World";}</script>'
		)
		//TRAIN html off

		//TRUCK html on VALID
		var TruckPage = (

			'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><!-- Bootstrap CSS --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"><style> #hide {display: none;} input.input-box { background: #a9adb0; }.image {position: relative;width: 950px;}.col {padding-left: 0px !important;padding-right: 0px !important;}x {position: absolute;top: 10px;left: 10px;}</style></head><body>' +
			'</head><body><div class="container"><img src="./img/Logo.png" width="400" height="200" class="rounded float-right"><br><br>' +
			'<input disabled  rows="1" cols="30"  value="' +
			UnternehmenTrain +
			'"><br><input  disabled cols="50" weight="30"  type="text"  size="30" value="' +
			adres1 +
			'"><br>' +
			'<br><br><h1>TRANSPORTAUFTRAG</h1><label for="fname">Unsere Position:</label>' +
			todeyid +
			'</label>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<label>Datum: </label>' +
			today +
			'<br><p>Sehr geehrte Damen und Herren,</p>' +
			'<p>hiermit beauftragen wir Sie mit folgendem Transport:</p><br><br>' +
			'<div class="image"><img src="./img/grey.jpg" height="200px" width="950px" /> <x><div style="width: 950px;"><div class="row" style="width: 950px; margin-left: 15px;"><div class="col"><br><div class="row">schif</div><div class="row"><input  disabled class="input-box" size="20" value="' +
			Schiff +
			'"></div><br><div class="row">equipment</div><div class="row"><input disabled  class="input-box" size="20" value="' +
			Equipment +
			'"></div></div><div class="col"><div class="row"><div class="col"><br>reederei<input  disabled class="input-box" size="10" value="' +
			Reederei +
			'"></div><div class="col"><br>etd<br><input  disabled class="input-box" size="9" value="' +
			ETD +
			'"></div></div><div class="row"><br>container</div><div class="row"><input  disabled class="input-box" size="20" value="' +
			Container +
			'"></div></div><div class="col"><div class="row"><div class="col"><br>pol<br><input  disabled class="input-box" size="12" value="' +
			POL +
			'"></div><div class="col"><br>pod<br><input  disabled class="input-box" size="9" value="' +
			POD +
			'"></div></div><div class="row"><br>inhalt</div><div class="row"><input  disabled class="input-box" size="20" value="' +
			Inhalt +
			'"></div></div><div class="col"><div class="row"><br>closing</div><div class="row"><input  disabled class="input-box" size="15" value="' +
			Closing +
			'"></div><div class="row"><br>gewicht</div><div class="row"><input  disabled class="input-box" size="15" value="' +
			Gewicht +
			'"></div></div></div></div></x></div>' +

			'<br><br><br><br><br><div class="container"><div class="row" style="width: 901px;"><div class="col-3">Leerdepot:</div><div class="col-9"><input disabled  style="width: 725px;"  value="' +
			Leerdepot +
			'"></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Pick-Up-Ref.:</div><div class="col-9"><input disabled  style="width: 725px;"value="' +
			Pick +
			'"></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Verfügbarkeit:</div><div class="col-9"><input disabled  style="width: 725px;"  value="' +
			Verfügbarkeit +
			'"><br><br></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Ladestelle:</div><div class="col-9"><input  disabled style="width: 725px;"value="' +
			Ladestelle +
			'"></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Ladereferenz:</div><div class="col-9"><input  disabled style="width: 725px;"value="' +
			Ladereferenz +
			'"></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Termin:</div><div class="col-9"><input  disabled style="width: 725px;"value="' +
			Termin +
			'"><br><br></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Rückliefer-Depot:</div><div class="col-9"><input  disabled style="width: 725px;"value="' +
			Rückliefer +
			'"></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Anlieferreferenz:</div><div class="col-9"><input  disabled style="width: 725px;"value="' +
			Anlieferreferenz2 +
			'"></div></div><br><div class="row" style="width: 901px;"><div class="col-3">Bemerkung:</div><div class="col-9"><textarea disabled  style="width: 725px;">' +
			Bemerkung2 +
			'</textarea><br><br></div></div><br><p>Frau Sibel Firat | Telefon:040 30727799 | Fax: 040 30723335 | Mail:sibel@aigorithmus.com <br>AI Gorithmus OÜ| Ahtri 12 10151 Tallinn Estonia | Register-Number: 16079086 | VAT-ID: |CEO: Nima Matini, SibelFirat <br>Wirarbeiten ausschließlich auf Grundlage unserer Allgemeinen Geschäftsbedingungen.</p><br><br><br><br><br><br><br><br><br><br><br><br><input  disabled class="rounded float-right" type="submit" value="PRINT" onclick="window.print()">' +
			'<form class="contact100-form validate-form" action="/sendtruck" method="post">' +
			'<input disabled  name="sil" id="sil" type="hidden" value="sil">' +
			'<button action="post">sil</button>' +
			'</form>' +
			'</div></body></html><!-- ahmet can canturk --></div> <p id="demo"></p> <script>function myFunction() {document.getElementById("demo").innerHTML = "Hello World";}</script>'
		)
		//TRUCK html off

		setTimeout(() => {

			if (secim == "TRAIN") {
				res.send(TrainPage)
			}
			if (secim == "TRUCK") {
				res.send(TruckPage)
			}
		}, 100);

		//ayni veriden var mi? tren varsa biri kalsin digerlerini sil

		//ayni veriden var mi? varsa kaydetme truck
		MongoClient.connect(url, (err, client) => {
			var silinecekid = ''
			if (err) throw err;
			const db = client.db('Transportauftrag');
			db.collection("All").find({}).toArray(function (err, result) {
				if (err) throw err;
				//2 tane olan veriyi bul ve tut
				result = result.filter(function (o) {
					return (
						o.Schiff === Schiff &&
						o.Reederei === Reederei &&
						o.ETD === ETD &&
						o.POL === POL &&
						o.POD === POD &&
						o.Closing === Closing &&
						o.Equipment === Equipment &&
						o.Container === Container &&
						o.Inhalt === Inhalt &&
						o.Gewicht === Gewicht &&

						o.Leerdepot === Leerdepot &&
						o.Pick === Pick &&
						o.Verfügbarkeit === Verfügbarkeit &&
						o.Ladestelle === Ladestelle &&
						o.Ladereferenz === Ladereferenz &&
						o.Termin === Termin &&
						o.Rückliefer === Rückliefer &&
						o.Anlieferreferenz2 === Anlieferreferenz2 &&
						o.Bemerkung1 === Bemerkung1 &&

						o.Abnahmeterminal === Abnahmeterminal &&
						o.Abgabereferenz === Abgabereferenz &&
						o.Bahnversand === Bahnversand &&
						o.Anlieferung === Anlieferung &&
						o.Anlieferterminal === Anlieferterminal &&
						o.Anlieferreferenz1 === Anlieferreferenz1 &&

						o.Bemerkung2 === Bemerkung2

					);

				});
				result.forEach(element => silinecekid = element);

				if (silinecekid._id == undefined) {
					console.log(' veriler kaydedildi')
					save()
					
				}
				else { console.log(' veriler kaydedilmedi') }
			});
		});
		//mongo send on
		function save() {
			//id+ on
			MongoClient.connect(url, (err, client) => {
				if (err) throw err;
				const db = client.db('Transportauftrag');
				let sorgu = { id: id };
				let yeniDeger = { $set: { id: ++id } };
				db.collection('id').updateOne(sorgu, yeniDeger, (err, result) => {
					if (err) throw err;
					client.close();
				});
			});
			//id+ off
			db.collection(colName1).insertOne(colData1, function (err, collection) {
				if (err) throw err;
				var truckid = collection.insertedId
				trucksakla(truckid)
				// console.log(colName1 + " KAYDEDILDI")
			});
			db.collection(colName2).insertOne(colData2, function (err, collection) {
				if (err) throw err;
				var trainid = collection.insertedId
				trainsakla(trainid)
				// console.log(colName2 + " KAYDEDILDI")
			});
			db.collection(colNameAll).insertOne(colDataAll, function (err, collection) {
				if (err) throw err;
				// console.log(colNameAll + " KAYDEDILDI")
			});
		}
		//mongo send off

// 		module.exports = {
// 			firstName: 'James',
// 			lastName: 'Bond'
// 		}

// 		var person = require('./app');
// console.log(person.firstName + ' ' + person.lastName);


	}
})
var sil = ''


//post tren
app.post('/sendtrain', function (req, res) {
	var duzenle = req.body.sil;
	//idyi al
	MongoClient.connect(url, (err, client) => {
		if (err) throw err;
		const db = client.db('Transportauftrag');
		let sorgu = {};
		db.collection('id').findOne(sorgu, (err, result) => {
			if (err) throw err;
			var trainid = result.trainid
			trainsil(trainid)
			client.close();
		});
	});
	//dosyayi sil
	function trainsil(trainid) {
		MongoClient.connect(url, (err, client) => {
			if (err) throw err;
			const db = client.db('Transportauftrag');
			var mongodb = require('mongodb');
			db.collection('Train', function (err, collection) {
				collection.deleteOne({ _id: new mongodb.ObjectID(trainid) }, function (err, results) {
					console.log(results.deletedCount + ' trainsil silindi id: ' + trainid)
					if (err) {
						console.log("failed");
						throw err;
					}
				});
			});
		});
	}
	//geri don
	res.redirect('/transportauftrag');
})
//post tir
app.post('/sendtruck', function (req, res) {
	var duzenle = req.body.sil;
	//idyi al
	MongoClient.connect(url, (err, client) => {
		if (err) throw err;
		const db = client.db('Transportauftrag');
		let sorgu = {};
		db.collection('id').findOne(sorgu, (err, result) => {
			if (err) throw err;
			var truckid = result.truckid
			trucksil(truckid)
			client.close();
		});
	});
	//dosyayi sil
	function trucksil(truckid) {
		MongoClient.connect(url, (err, client) => {
			if (err) throw err;
			const db = client.db('Transportauftrag');
			var mongodb = require('mongodb');
			db.collection('Truck', function (err, collection) {
				collection.deleteOne({ _id: new mongodb.ObjectID(truckid) }, function (err, results) {
					console.log(results.deletedCount + ' truck silindi id: ' + truckid)
					if (err) {
						console.log("failed");
						throw err;
					}
				});
			});
		});
	}
	//geri don
	res.redirect('/transportauftrag');
})

//mongo kayit truckid
function trucksakla(truckid) {
	var truckidd = truckid
	MongoClient.connect(url, (err, client) => {
		if (err) throw err;
		const db = client.db('Transportauftrag');
		let sorgu = {};
		db.collection('id').findOne(sorgu, (err, result) => {
			if (err) throw err;
			var truckid = result.truckid
			tkid(truckid)
			client.close();
		});
	});
	function tkid(truckid) {
		MongoClient.connect(url, (err, client) => {
			if (err) throw err;
			const db = client.db('Transportauftrag');
			let sorgu = { truckid: truckid };
			let yeniDeger = { $set: { truckid: truckidd } };
			db.collection('id').updateOne(sorgu, yeniDeger, (err, result) => {
				if (err) throw err;
				client.close();
			});
		});
	}
}
//mongo kayit trainid
function trainsakla(trainid) {
	var trainidd = trainid
	MongoClient.connect(url, (err, client) => {
		if (err) throw err;
		const db = client.db('Transportauftrag');
		let sorgu = {};
		db.collection('id').findOne(sorgu, (err, result) => {
			if (err) throw err;
			var trainid = result.trainid
			tkid(trainid)
			client.close();
		});
	});
	function tkid(trainid) {
		MongoClient.connect(url, (err, client) => {
			if (err) throw err;
			const db = client.db('Transportauftrag');
			let sorgu = { trainid: trainid };
			let yeniDeger = { $set: { trainid: trainidd } };
			db.collection('id').updateOne(sorgu, yeniDeger, (err, result) => {
				if (err) throw err;
				client.close();
			});
		});
	}
}
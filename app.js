var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
//sunucu baglantisi
// var db = require('./app_server/modals/db');
var MongoClient = require('mongodb').MongoClient;
<<<<<<< HEAD
var url = "mongodb://167.99.253.192:27017";

=======
var url = "mongodb://localhost:27017/";
>>>>>>> e1abed0ebe976f31ea7d8d803a1fe1157692e43c
//file name
var excelName = 'exampledata';

app.use(bodyParser.json());  

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
        excelName = file.originalname
    }
});


var upload = multer({ //multer settings
                storage: storage,
                fileFilter : function(req, file, callback) { //file filter
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }
            }).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and 
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        console.log(req.file.path);
        try {
            exceltojson({
                input: req.file.path,
                output: null, 
                //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                } 
                
                function islem2() {
                    //save        
                    MongoClient.connect(url, function(err, db) {
                      if (err) throw err;
                      var dbo = db.db("excelFiles");
                      //insert
                      dbo.collection(excelName).insertMany(result, function(err, res) {
                        if (err) throw err;
                        console.log("data inserted");
                        db.close();
                      });
                    });                    



                }
                function islem() {
                     //data show screen
                     res.json(result);
                     islem2()
                }
                islem();

              
            });
        } catch (e){

            //Corupted excel file
            res.json({error_code:1,err_desc:"bozuk dosya"});
        }
    })
   
});

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});



app.listen('8000', function(){
    console.log('running on 8000...');
});





<<<<<<< HEAD






=======
//a.canturk
>>>>>>> e1abed0ebe976f31ea7d8d803a1fe1157692e43c

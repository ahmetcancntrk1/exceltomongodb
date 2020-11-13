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

app.use(bodyParser.json());  

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        excelName = file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]
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
             
                function islem2(req,res) {
                    islem3()                  
                    if (1==0) {
                        console.log('data not saved')
                    } else {
                    //Write        
                    MongoClient.connect(url, function(err, db) {
                      if (err) throw err;
                      var dbo = db.db("excelFiles");
                      //insert
                      dbo.collection(excelName).insertMany(result, function(err, res) {
                        if (err) throw err;
                        console.log('data saved')
                        db.close();
                      });
                    });
                }   
            }       
                function islem() {
              //console.log('http://localhost/demo/list.php?link=http://165.227.148.66/json&filename='+excelName)
              res.json(result);
              setTimeout(function() {
                njson = result
            }, random);
                   islem2();          
                }
                islem();
                function islem3() {
                    //Read        
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("excelFiles");
                        //Find all documents in the customers collection:
                        dbo.collection(excelName).find({}).toArray(function(err, result) {
                          if (err) throw err;
                        // console.log(result);
                        
                          db.close();
                        });
                      });
                }

              
            });
        } catch (e){

            //Corupted excel file
            res.json({error_code:1,err_desc:"bozuk dosya"});
        }
    })
   
});
var random = Math.floor(Math.random() * 600) + 100  
app.get('/json', function(req,res) {
setTimeout(function() {
res.send(njson)
}, random);
});

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.get('/transportauftrag',function(req,res){
    res.sendFile(__dirname + "/transportauftrag.html");
});
app.post('/get/ip/address', function (req, res) {

});
app.listen('3000', function(){
    console.log('running on 3000...');
});








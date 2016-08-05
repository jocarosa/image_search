var express     = require('express');
var app         = express();
var request     = require('request');
var url         = require('url');
var modelRecent = require('./public/model/recent');
var mongoose    = require('mongoose');

require('dotenv').load();
mongoose.connect(process.env.MONGO_URI);
app.use(express.static('public'));


app.get('/api/imagesearch/:query',function(req,res){
   
   var search  = url.parse(req.url).pathname.split('/')[3]; // input query
   var offset  = req.param('offset');
   var query   = 'q=' + search +'&count=10&offset='+offset +'&mkt=en-us&safeSearch=Moderate'; //url query
   var options = {
     uri: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?' +
       query,
     headers: {
       'Ocp-Apim-Subscription-Key': process.env.KEYIMAGESEARCH
       }
     };
   
    var cont  = [];
 
    request(options,function(err,response,body){
    
      var images = JSON.parse(body).value;
      
    
        function callback(element){
           
            cont.push({
               name         : element.name,
               url          : element.hostPageDisplayUrl,
               thumbnailUrl : element.thumbnailUrl,
               content      : element.contentUrl
               
            });
           
        }
       
      images.forEach(callback);
      res.end(JSON.stringify(cont));
    
    });
   
    //saving last query
    
    var recently = new modelRecent(
        { term: search, when:new Date() 
            
        });
    recently.save(function(err,doc){console.log('save recently')})
});



app.get('/recently',function(req,res){
    
var cont=[];
    
    modelRecent.find({},function(err,doc){
        
        doc.forEach(function(element){
            cont.push({
                term : element.term,
                when : element.when
            });
             
        });
       
       res.end(JSON.stringify(cont));
    });
    
});


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
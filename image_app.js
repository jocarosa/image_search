var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/');
var url=require('url');

app.all('*',function(req,res){
   
 
var url_parts= url.parse(req.url,true);
var offset= url_parts.query.offset;

//console.log(query);

var Model1 = require('db/model1.js');


Model1.paginate({},{ page: offset, limit: 10 },function(err,result){
    if(err)console.log('err paginate');
    res.send(result.docs);
});






/*
var obModel1= new Model1({"url":"https://s-media-cache-ak0.pinimg.com/236x/4f/eb/97/4feb97594932dfc987d24c8af0769077.jpg","snippet":"Funniest Lolcats | funny cat","thumbnail":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSOjnwL5b_V1r5nPdDK4eE8-S0bRBW19Sjx2ugTwTQgMOAm18Wl_tBGcQ",
"context":"https://www.pinterest.com/pin/464504149043842668/"});

for(var i=0;i<3;i++){

obModel1.save(function(err){
    if(err){return err}
    console.log('save...');
    
});

}*/


//Model1.remove('url:https://s-media-cache-ak0.pinimg.com/236x/4f/eb/97/4feb97594932dfc987d24c8af0769077.jpg',function(){});

/*
Model1.find({}, usersProjection, function (err, urls) {
    if (err) return(err);
    res.send(urls);
});*/

});


/*
Model1.findOne({id:id},function(err,data){
      if(err)console.log('data error');  
 
 // res.redirect(301, data.url);

      console.log(data.url);
     

 
});
*/






var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
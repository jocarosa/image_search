var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

    
var urlSchema = mongoose.Schema({
    url: String, 
    snippet: String,
    thumbnail:String,
    context:String
    
    
});
urlSchema.plugin(mongoosePaginate);

var Model1 = mongoose.model('Model1',urlSchema) ;
 



module.exports = Model1;
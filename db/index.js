var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/stage',{useNewUrlParser:true,useFindAndModify:false})
require('./models/user')
require('./models/projet')
require('./models/conversation')

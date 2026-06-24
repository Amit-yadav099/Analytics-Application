const mongoose= require("mongoose");

const eventSchema= new mongoose.Schema({
 
    sessionId:{type:String, required:true, index: true},
 
    eventType:{type:String, enum:['page_view','click'], required:true},

    pageUrl:{type:String,required:true},

    timestamp:{type:Date,default:Date.now},

    x:{type:Number, default:null},
    
    y:{type:Number, default:null}

});

eventSchema.index({ pageUrl: 1 });

eventSchema.index({ timestamp: -1 });

eventSchema.index({pageUrl: 1, eventType: 1 });

module.exports= mongoose.model('Event',eventSchema);
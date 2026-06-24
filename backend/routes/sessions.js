// to list the sessions related tasks, and to get the heatmap

const express=require('express');
const router= express.Router();
const Event=require('../models/Event');

router.get('/',async(req,res)=>{
    try{
        const sessions=await Event.aggregate([
            {$group:{_id:'$sessionId',count:{ $sum:1 }, firstEvent:{$min:'$timestamp'}}},
            {$sort:{firstEvent:-1}}
        ]);

        res.json(sessions.map(s=>({sessionId:s._id,eventCount:s.count})))
    }
    catch(err){
         res.status(500).json({error:err.message});
    }
});



router.get('/heatmap',async(req, res)=>{
    try{
         const { pageUrl }=req.query;
         if(!pageUrl) return res.status(400).json({error:'PageUrl required'});
         const clicks=await Event.find({
            pageUrl, eventType:'click',
            x:{ $ne:null },
            y:{ $ne:null }
         }).select('x y -_id');
         res.json(clicks);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});




// for the ordered events



router.get('/:sessionId/events',async(req,res)=>{
    try{
        const events = await Event.find({ sessionId:req.params.sessionId}).sort({ timestamp: 1 });
        res.json(events);
    }
    catch(err){
         res.status(500).json({error:err.message});
    }
});

module.exports= router;


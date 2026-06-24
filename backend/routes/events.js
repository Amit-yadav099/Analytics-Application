// to receive and store the events

const express=require('express');
const router=express.Router();
const Event=require('../models/Event');

// to save the events, POST

router.post('/',async(req,res)=>{
    try{
        const {sessionId, eventType, pageUrl,x,y}= req.body;
        if(!sessionId || !eventType || !pageUrl){
            return res.status(400).json({error:'Missing required fields'});
        }
        const event= new Event({sessionId, eventType, pageUrl, x, y});
        await event.save();
        res.status(201).json({message:'Event stored'});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

module.exports= router;
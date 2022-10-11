const express = require('express');
const { response, request } = require('../aap');
const router = express.Router();
const Match = require('../models/match');

router.get('/move/:id/', async function (req, res) {
    var id = req.params.id;
    var match = await Match.find({ roomId: id});
    //if(match.length)
    // var json= match[0].moves;
    // for(var i=0; json.length; i++){
    //     json[i] = JSON.stringify(json[i]); 
    // }

    match = match.length ? match : "No move"
    return res.json({
        message: match
    }); 


});

router.post('/move', async function (req, res) {
    move = req.body.move
    move = JSON.stringify(move)
    matchId = req.body.id

    

    console.log( move, matchId);

    var resp = ""
    var match = await Match.find({ roomId: matchId});
    console.log(match.length," match return");
    if (!match.length){ // if the game data doesn't exist.
        console.log("if case");
        resp = new Match({
            roomId: matchId,
        })

        resp.save();
    }    
    else{
        console.log("match value",match[0]._id);
        resp = await Match.findByIdAndUpdate(
            match[0]._id,
            { ["$addToSet"]: { moves: move }, },
            { new: true }
            );
        }


    console.log(resp);
    return res.json({
        message: resp
    });


    

});

module.exports = router;
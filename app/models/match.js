const mongoose = require('mongoose');

// User Schema
const MatchSchema = mongoose.Schema({
   
    roomId:{
        type: String
    },
    moves: {
        type: [String]
    }
    
});

const User = module.exports = mongoose.model('match', MatchSchema);


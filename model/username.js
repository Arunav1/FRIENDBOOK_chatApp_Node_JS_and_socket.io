const mongoose = require('mongoose');

const userschema = new mongoose.Schema({ 
  username:{
    type: String,
    required: true
  }
});


const user1 = mongoose.model('user1', userschema);

module.exports = user1;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    username: {type:String, required:[true, 'Username cannot be empty']},

    hashedPassword: {type:String, required:[true, 'Password cannot be empty']},

    email: {type:String, required: [true, 'Email cannot be empty'],

        validate: {
            validator: function(v) {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(v)
            },
            message: 'Please fill a valid email address'
        },
        
        unique: true

    },

    translated: {type:Boolean, default: false}
    
});

schema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('User', schema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    phoneNumber: {type:Number, required:[true, 'Phone Number cannot be empty']},

    farmerName: {type:String, required:[true, 'Farmer Name cannot be empty']},

    village: {type:String, required:[true, 'Village cannot be empty']},

    district: {type:String, required:[true, 'District cannot be empty']},

    state: {type:String, required: [true, 'State cannot be empty']},

    languageCode: {type:String, required: [true, 'Language Code cannot be empty']},

    language: {type:String, required: [true, 'Language cannot be empty']},

    user: {type: Schema.ObjectId, ref: 'User'}
    
});

schema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('TranslateModel', schema);
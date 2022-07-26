var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/users');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)
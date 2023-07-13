const mongoose = require('mongoose');
const colors = require('colors-console');
const bcrypt = require('bcrypt');

const { mongodbConf } = require('../conf/dbConf');

mongoose.connect(`${mongodbConf.url}/${mongodbConf.dbName}`,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const mongodb = mongoose.connection;
mongodb.on('error', error => error && console.error(error));
mongodb.on('open', () => console.log(colors('green', 'Mongodb:'), 'mongodb is connected'));
mongodb.on('close', () => console.log(colors('green', 'Mongodb:'), 'mongodb is closed'));

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set(password) {
            return bcrypt.hashSync(password, 10);
        }
    },
    tokens: {
        type: Number,
        default: 10000
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
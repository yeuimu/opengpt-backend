const mongoose = require('mongoose');
const colors = require('colors-console');

const { mongodbConf } = require('../conf/dbConf');

mongoose.connect(`${mongodbConf.url}/${mongodbConf.dbName}`,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const mongodb = mongoose.connection;
mongodb.on('error', error => error && console.error(error));
mongodb.on('open', () => console.log(colors('green', 'Mongodb:'), 'mongodb is connected'));
mongodb.on('close', () => console.log(colors('green', 'Mongodb:'), 'mongodb is closed'))

const authSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
}, {
    timestamps: true
});

const auth = mongoose.model('auth', authSchema);

module.exports = {
    mongodb,
    auth
}
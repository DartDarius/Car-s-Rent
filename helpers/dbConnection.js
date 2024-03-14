const mongoose = require('mongoose');
const {URL} = require('./constants')


mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {
    mongoose
}
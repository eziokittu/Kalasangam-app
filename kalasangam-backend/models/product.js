const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {type: String, required: true },
    description: {type: String, required: true },
    image: {type: String, required: true },
    category: {type: String, required: true },
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    
    createdAt: {type: Date, default: Date.now()},
    website: {type: String, default: 'https://www.google.com/' },
    facebook: {type: String, default: 'https://www.facebook.com/' },
    instagram: {type: String, default: 'https://www.instagram.com/' },
    twitter: {type: String, default: 'https://twitter.com/' }
});

module.exports = mongoose.model('Product', productSchema);
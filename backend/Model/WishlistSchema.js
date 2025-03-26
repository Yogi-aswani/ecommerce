const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    
}, { timestamps: true,versionKey:false });

module.exports = mongoose.model('Wishlist', WishlistSchema);
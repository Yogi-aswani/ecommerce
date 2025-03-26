const mongoose = require('mongoose');

const ProductImagesSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    status: {
        type: Boolean,
        default: true
    }  
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('ProductImages', ProductImagesSchema);
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
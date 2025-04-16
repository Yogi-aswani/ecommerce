const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    qty: {
        type: Number,
        required: true
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Supplier'
    },
},{timestamps: true});

module.exports = mongoose.model('Inventory', InventorySchema);
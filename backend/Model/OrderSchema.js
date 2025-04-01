const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    payment_mode: {
        type: String,
        required: true
    },
    deliveryDate:{
        type:Date,
        required:true,
        
    },
    status: {
        type: String,
        default: 'placed'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
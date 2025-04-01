const mongoose = require('mongoose');

const supplireOrderSchema = new mongoose.Schema({
    supplireId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplire',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    status: {
        type: String,
        required:true,
        default:'initied'
    },
    payment_mode: {
        type: String,
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    quantity:{
        type:Number,
        required:true,
    }
}, { timestamps: true,versionKey:false });

module.exports = mongoose.model('SupplireOrder', supplireOrderSchema);
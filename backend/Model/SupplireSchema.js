const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    email: {
        type: String,
        required: true,
    },
    bussiness: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },
    status:{
        type:String,
        required:true,
        default:'active'
    }
    
}, { timestamps: true, versionKey:false });

module.exports = mongoose.model('Supplier', supplierSchema);
const mongoose = require('mongoose');
const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    receiverName: {
        type: String,
        
        trim: true,
    },
    receiverPhone: {
        type: String,
        
        trim: true,
    },
    pincode: {
        type: String,
        
        trim: true,
    },
    city: {
        type: String,
        
        trim: true,
    },
    state: {
        type: String,
        
        trim: true,
    },
    country: {
        type: String,
        
        trim: true,
    },
    address: {
        type: String,
        
        trim: true,
    },
    apartment: {
        type: String,
        trim: true,
    },
    landmark: {
        type: String,
        trim: true,
    },
    alternativeNumber: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Address', AddressSchema);

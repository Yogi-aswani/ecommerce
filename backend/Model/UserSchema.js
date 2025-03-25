const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'active',
    },
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplier',
        required: false
    },
    otp: {
        type: String,
        required: false
    },
    otpTime: {
        type: Date,
        required: false
    },

}, { timestamps: true, versionKey:false });

module.exports = mongoose.model('User', userSchema);
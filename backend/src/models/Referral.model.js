/**
 * @file         Referral.model.js
 * @description  Tracks peer-to-peer referrals and rewards.
 * @module       models/Referral
 */

const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    referrer: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'User',
        required: true,
    },
    refereeEmail: {
        type:      String,
        required:  true,
        lowercase: true,
    },
    status: {
        type:    String,
        enum:    ['sent', 'registered', 'shopped'],
        default: 'sent',
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'Order',
    },
    rewardPoints: {
        type:    Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Referral', referralSchema);

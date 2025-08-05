const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "please add the user id"],
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, "please add the contacts name"],
    },
    email: {
        type: String,
        required: [true, "please add the contact email address"],
    },
    phone: {
        type: String,
        required: [true, "please add the contact phone number"],
    },
}, {
    timestamps: true,
});

// Create a compound index to enforce uniqueness per user
contactSchema.index({ user_id: 1, phone: 1 }, { unique: true });

module.exports = mongoose.model("Contact", contactSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Must Provide UserName"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Must Provide Password"],
        validate: {
            validator: function (v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test(v);
            },
            message: "Password must be between 6 to 16 characters long, contain at least one numeric digit, " +
                "one uppercase and one lowercase letter"
        }
    },
    email: {
        type: String,
        required: [true, "Must Provide Email"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: "Invalid email address"
        }
    }
});

module.exports = mongoose.model('User', UserSchema);
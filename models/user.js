var mongoose = require("mongoose");
var bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true);

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    registered: {
        type: String,
        required: true
    },
    newsletter: {
        type: Boolean,
        default: false
    },
    lastTracked: {}
});

/**
 * Static Methods
 */

// Authenticate input against database documents
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
            .exec(function (err, user) {

                if (err) {
                    return callback(err);

                } else if (!user) {
                    // ERROR 401: User not found.
                    var error = new Error('User not found.');
                    error.status = 401;
                    return callback(err);
                }

                bcrypt.compare(password, user.password, function (err, result) {
                    if (result === true) {
                        return callback(null, user);
                    } else {
                        return callback();
                    }
                });
            });
}

/**
 * Pre Methods
 */

// Hash password before saving to the database
UserSchema.pre('save', function (next){
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        } else {
            user.password = hash;
            next();
        }
    });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
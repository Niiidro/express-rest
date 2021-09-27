import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const AccountSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        lastIP: {
            type: String,
        },
        lastLogin: {
            type: String,
        },
    },
    {
        versionKey: false,
    }
);

//Hash Password when save Account https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
AccountSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
//Compare Hashed Password Function https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
AccountSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.model('Account', AccountSchema);

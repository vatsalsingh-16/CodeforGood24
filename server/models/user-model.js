import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        trim: true
    },
    place: String,
    dateofbirth: { type: Date },
    dateofjoining: { type: Date, default: Date.now },
    phoneno: String,
    email: String,
    qualification: String,
    password: String
});

export default mongoose.model('user', userSchema);
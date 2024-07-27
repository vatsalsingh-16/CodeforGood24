import mongoose from 'mongoose';

const workerSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        trim: true
    },
    phoneno: String,
    location: String,
    age: Number,
    type: String
});

export default mongoose.model('worker', workerSchema);
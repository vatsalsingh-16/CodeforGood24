import mongoose from 'mongoose';

const siteSchema = mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    status: String,
    progress: Number
});

export default mongoose.model('site', siteSchema);
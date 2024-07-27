import mongoose from 'mongoose';

const manufactureSchema = mongoose.Schema({
    machine: String,
    labour: String,
    progress: Number,
    orderID: { type: mongoose.Schema.Types.ObjectId }
});

export default mongoose.model('manufacture', manufactureSchema);
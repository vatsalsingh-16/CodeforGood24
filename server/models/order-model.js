import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    name: String,
    orderType: String,
    customization: String,
    quantity: Number,
    tentative: { type: Date, default: Date.now },
    cost: Number
});

export default mongoose.model('order', orderSchema);
import mongoose from 'mongoose';

const machinerySchema = mongoose.Schema({
    name: {
        type: String,
    },
    quantity: Number,
    type: String
});

export default mongoose.model('machinery', machinerySchema);
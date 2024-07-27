import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    machines: {
        type: Array,
        default: []
    },
    workers: {
        type: Array,
        default: []
    }
});

export default mongoose.model('attendance', attendanceSchema);
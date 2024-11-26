import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});


const education = mongoose.model('education', CategorySchema);

export default education;
import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    about: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: false
    },
    contacts: {
        type: Array,
        required: false
    },
    
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false   
    },
    createdDate: {
        type: Date
    }
});


const post = mongoose.model('post', PostSchema);

export default post;
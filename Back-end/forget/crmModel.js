import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name',
        min: 2
    },
    lastName: {
        type: String,
        required: 'Enter a last name',
        min: 2
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
      },
      hashed_password: {
        type: String,
        required: "Password is required",
        min:6,
        max:1023,
      },
    phone: {
        type: Number,
        min: 10,
        max: 10
    },
    notes: {
        type: String
    },
    created_date: {
       type: Date,
       default: Date.now 
    }
});

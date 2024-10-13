const {mongodbUrl} = require('../secret');
const mongoose  = require('mongoose');

const connectDB = async(option={}) =>{
    try {
        await mongoose.connect(mongodbUrl);
        console.log('Successfully Connected to MongoDB');
        mongoose.connection.on('error', (error)=>{
            console.error('DB Connection Error:',error);
        })
    } catch (error) {
        console.error('Could not Connect to DB', error.toString())
    }
}


module.exports = {connectDB}
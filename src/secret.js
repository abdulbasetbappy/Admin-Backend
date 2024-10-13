require("dotenv").config();
const serverport = process.env.SERVER_PORT || 3000;
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/ecommerceDB';
const defaultUserImage = process.env.DEFAULT_USER_IMAGE || './public/images/users/user.png';


module.exports = { serverport,mongodbUrl,defaultUserImage };
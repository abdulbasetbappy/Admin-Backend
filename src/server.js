const app = require('./app');
const { connectDB } = require('./config/db');
const {serverport} = require('./secret');


app.listen(serverport,async ()=>{
    console.log(`Server is Successfully Running On http://localhost:${serverport}`);
    await connectDB();
})
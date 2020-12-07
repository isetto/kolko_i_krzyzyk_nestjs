import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config()
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qx6k5.mongodb.net/todos-tdd?retryWrites=true&w=majority`;
export async function connectDb() {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        await mongoose.connect( uri, options )
    }
    catch ( err ) {
        console.log( 'connection err:', err )
    }
}

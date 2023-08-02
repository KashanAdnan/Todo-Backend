import mongoose from "mongoose";

const connectDatabase = (url) => {
    mongoose.connect(url).then((res) => {
        console.log(`Mongo DB Connected With ${res.connection.host}`);
    })
}

export default connectDatabase 
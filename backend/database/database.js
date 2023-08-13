import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
      .connect(process.env.MONGO_URL,{
        dbName: "ecommerce",
      })
      .then((c) => console.log(`Database Connected with ${c.connection.host}`))
      .catch((e) => console.log(e));
  };
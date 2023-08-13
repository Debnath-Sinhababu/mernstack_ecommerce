import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
      .connect('mongodb+srv://nodejs_todo:nodejs_todo@cluster0.ni3psao.mongodb.net/',{
        dbName: "ecommerce",
      })
      .then((c) => console.log(`Database Connected with ${c.connection.host}`))
      .catch((e) => console.log(e));
  };
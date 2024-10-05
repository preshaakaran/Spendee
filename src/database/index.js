import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl = "your-mongodb-url";
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Auth database connected"))
    .catch((e) => console.log(e));
};

export default connectToDB;

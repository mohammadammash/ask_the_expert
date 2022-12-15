const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err: any) => {
    console.log(err);
  });

export default mongoose;
import mongoose from "mongoose";

async function dbConnect(app) {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("\nDataBase Connect..............");
        app.listen(process.env.PORT, () => {
          console.log(`Server Started: http://localhost:${process.env.PORT}/`);
        });
      })
      .catch((e) => {
        console.log("Error :" + e);
      });
  } catch (error) {
    console.log("Error : " + error);
  }
}

export { dbConnect };

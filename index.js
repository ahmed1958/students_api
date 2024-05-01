import { app } from "./app.js";
import mongoose from "mongoose";
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log(`listening on port ${port} ...`);
});

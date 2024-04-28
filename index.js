import { app } from "./app.js";
import mongoose from "mongoose";
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await mongoose.connect('mongodb+srv://ahmedsayeda829:9ZJoFAqcZhyuLa9f@cluster0.arhbuoj.mongodb.net/Project');
    console.log(`listening on port ${port} ...`)
});

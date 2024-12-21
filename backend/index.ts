import express from "express";
import mysqlDB from "./mysqlDB";
import newsRouter from "./routers/news";
import commentsRouter from "./routers/comments";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.use('/news',newsRouter);
app.use('/comments',commentsRouter);


const run = async () =>  {
    await mysqlDB.init();

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));
import express from "express";
import mysqlDB from "../mysqlDB";
import {News, NewsWithoutId} from "../types";
import {ResultSetHeader} from "mysql2";
import {imagesUpload} from "../multer";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    const connection = await mysqlDB.getConnection();

    const [result] = await connection.query('SELECT id,title,image,create_at FROM news');

    const news = result as News[];

    res.send(news);
})

newsRouter.post('/',  imagesUpload.single('image'),async (req, res,next) => {
    if(!req.body.title || !req.body.description) {
        res.status(400).send({error: "Please send a title and description"});
        return;
    }

    const news: NewsWithoutId = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? 'images' + req.file.filename : null
    }

    try {
        const connection = await mysqlDB.getConnection();
        const [result] = await connection.query('INSERT INTO news (title, description, image) VALUES (?,?,?)', [news.title, news.description, news.image]);
        const resultHeader = result as ResultSetHeader;
        const [resultOneNews] = await connection.query('SELECT * FROM news WHERE id=?', [resultHeader.insertId]);
        const oneNews = resultOneNews as News[];

        if (oneNews.length === 0) {
            res.status(404).send({error: "News Not Found"});
        } else {
            res.send(oneNews[0]);
        }
    } catch (e){
        next(e);
    }
});


export default newsRouter;
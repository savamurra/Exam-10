import express from "express";
import mysqlDB from "../mysqlDB";
import {Comment, News, NewsWithoutId} from "../types";
import {ResultSetHeader} from "mysql2";
import {imagesUpload} from "../multer";
import commentsRouter from "./comments";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    const connection = await mysqlDB.getConnection();

    const [result] = await connection.query('SELECT id,title,image,created_at FROM news');

    const news = result as News[];

    if (news.length === 0) {
        res.send("No results found!");
    } else {
        res.send(news);
    }
});

newsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const connection = await mysqlDB.getConnection();
    const [result] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);

    const news = result as News[];

    try {
        if (news.length === 0) {
            res.status(404).send("News not found");
        } else {
            res.send(news[0]);
        }
    } catch (e) {
        next(e);
    }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    if (!req.body.title || !req.body.description) {
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
    } catch (e) {
        next(e);
    }
});

newsRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const connection = await mysqlDB.getConnection();
        const [result] = await connection.query('DELETE FROM news WHERE id=?', [id]);
        const resultHeader = result as ResultSetHeader;

        if (resultHeader.affectedRows > 0) {
            res.send("News deleted successfully");
        } else {
            res.status(500).send("Failed to delete news");
        }
    } catch (e) {
        next(e);
    }
})


export default newsRouter;
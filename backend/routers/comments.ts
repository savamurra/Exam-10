import express from "express";
import mysqlDB from "../mysqlDB";
import {Comment, CommentWithoutId, News,} from "../types";
import {ResultSetHeader} from "mysql2";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    const connection = await mysqlDB.getConnection();

    const [result] = await connection.query('SELECT * FROM comments');

    const comment = result as Comment[];

    if (comment.length === 0) {
        res.send("No results found!");
    } else {
        res.send(comment);
    }
})


commentsRouter.post('/', async (req, res, next) => {
    if (!req.body.comments_id || !req.body.comment_text) {
        res.status(400).send({error: "Please send a title and description"});
        return;
    }

    const comment: CommentWithoutId = {
        comments_id: req.body.comments_id,
        author: req.body.author ? req.body.author : 'Anonymous',
        comment_text: req.body.comment_text,
    }

    try {
        const connection = await mysqlDB.getConnection();
        const [result] = await connection.query('INSERT INTO comments (comments_id, author, comment_text) VALUES (?,?,?)', [comment.comments_id, comment.author, comment.comment_text]);
        const resultHeader = result as ResultSetHeader;
        const [resultOneComment] = await connection.query('SELECT * FROM comments WHERE id=?', [resultHeader.insertId]);
        const oneComment = resultOneComment as News[];

        if (oneComment.length === 0) {
            res.status(404).send({error: "Comment Not Found"});
        } else {
            res.send(oneComment[0]);
        }
    } catch (e) {
        next(e);
    }
});

commentsRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const connection = await mysqlDB.getConnection();
        const [result] = await connection.query('DELETE FROM comments WHERE id=?', [id])
        const resultHeader = result as ResultSetHeader;

        if (resultHeader.affectedRows > 0) {
            res.send("Comment deleted successfully");
        } else {
            res.status(500).send("Failed to delete comment");
        }
    } catch (e) {
        next(e);
    }
})

export default commentsRouter;
import {Box, Button, Card, CardActions, CardMedia, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import { newsId} from "../../news/newsSlice.ts";
import {allComments, isDelete} from "../commentsSlice.ts";
import CommentsForm from "./CommentsForm.tsx";
import {useCallback, useEffect} from "react";
import {getNewsId} from "../../news/newsThunk.ts";
import {useParams} from "react-router-dom";
import {deleteComments, getComments} from "../commentsThunk.ts";
import {apiUrl} from "../../../globalConstants.ts";
import picture from "../../../../public/notfound.png";
import dayjs from 'dayjs';


const Comments = () => {
    const {id} = useParams<{id: string}>();

    const news = useAppSelector(newsId);
    const comments = useAppSelector(allComments);
    const dispatch = useAppDispatch();
    const deleteLoading = useAppSelector(isDelete);

    const onDelete = useCallback(async (commentId: string) => {
        await dispatch(deleteComments(commentId));
        if (id) {
            await dispatch(getComments(id))
        }
    }, [dispatch]);

    const newsMessage = news?.image ? apiUrl + '/' + news.image : picture;


    useEffect(() => {
        if (id) {
            dispatch(getNewsId(id));
            dispatch(getComments(id))
        }
    }, [dispatch, id]);

    if (!news) {
        return <Typography>News not found.</Typography>;
    }

    return (
        <>

            <>
                <Box sx={{
                    flexGrow: 1,
                    maxWidth: 600,
                    margin: "auto",
                    border: "3px solid DarkViolet",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    marginBottom: "10px",
                }} key={news.id}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box>
                            <Typography>Title:{news.title}</Typography>
                            <Typography>Description: {news.description}</Typography>
                            <Typography>At: {dayjs(news.created_at).format("YYYY-MM-DD HH:mm")}</Typography>
                        </Box>
                        <CardActions>
                            <CardMedia
                                style={{ width: '150px', border: "3px solid white" }}
                                component="img"
                                image={newsMessage}
                                title={news.title}
                            />
                        </CardActions>
                    </Box>


                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map((comment) => (
                            <Card sx={{marginBottom: 2, marginTop: 1}} key={comment.id}>
                                <CardActions>
                                    <div>
                                        <Typography>{comment.author} wrote: {comment.comments_text}</Typography>
                                        <Button disabled={deleteLoading} onClick={() => onDelete(comment.id)}>Delete</Button>
                                    </div>
                                </CardActions>
                            </Card>
                        ))
                    ) : (
                        <Typography>No comments available.</Typography>
                    )}
                </Box>
                <CommentsForm id={news.id}/>
            </>
        </>
    );
};

export default Comments;
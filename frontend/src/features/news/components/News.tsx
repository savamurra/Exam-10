import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {allNews, deleteLoading, getLoading} from "../newsSlice.ts";
import {useCallback, useEffect} from "react";
import {deleteNews, getNews} from "../newsThunk.ts";
import dayjs from "dayjs";
import { NavLink} from "react-router-dom";
import {apiUrl} from "../../../globalConstants.ts";
import picture from '../../../../public/notfound.png';
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";




const News = () => {
    const dispatch = useAppDispatch()
    const news = useAppSelector(allNews);
    const isDelete = useAppSelector(deleteLoading);
    const isLoading = useAppSelector(getLoading);

    const onDelete = useCallback(async (id: string) => {
        await dispatch(deleteNews(id));
        await dispatch(getNews());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    if (!news) {
        return <Typography>News not found.</Typography>;
    }

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h3">News</Typography>
                    <Button to="newsForm" component={NavLink}>Add news</Button>
                </Box>
            )}

            <hr />

            {Array.isArray(news) && news.length > 0 ? (
                news.map((newsItem) => {
                    const newsMessage = newsItem?.image ? apiUrl + '/' + newsItem.image : picture;
                    return (
                        <Card
                            key={newsItem.id}
                            sx={{
                                marginBottom: "10px",
                                boxShadow: 2,
                                borderRadius: "8px",
                            }}
                        >
                            <Box sx={{ flexGrow: 1, display: "flex" }}>
                                <CardActions>
                                    <CardMedia
                                        style={{ width: "150px" }}
                                        component="img"
                                        image={newsMessage}
                                        title={newsItem.title}
                                    />
                                </CardActions>

                                <CardContent sx={{ width: 300 }}>
                                    <Typography gutterBottom sx={{ fontSize: 20 }}>
                                        Title: {newsItem.title}
                                    </Typography>
                                    <Typography gutterBottom sx={{ fontSize: 18 }}>
                                        Created at: {dayjs(newsItem.created_at).format("YYYY-MM-DD HH:mm")}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardContent sx={{ width: 300 }}>
                                <Button to={`/readNews/${newsItem.id}`} component={NavLink}>Read full post</Button>
                            </CardContent>
                            <CardContent sx={{ width: 300 }}>
                                <Button disabled={isDelete} type="button" onClick={() => onDelete(newsItem.id)}>Delete</Button>
                            </CardContent>
                        </Card>
                    );
                })
            ) : (
                <Typography>No news available.</Typography>
            )}
        </>
    );

};

export default News;
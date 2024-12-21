import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {allNews} from "../newsSlice.ts";
import {useEffect} from "react";
import {getNews} from "../newsThunk.ts";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {apiUrl} from "../../../globalConstants.ts";
import picture from '../../../../public/no_image.jpg';


const News = () => {
    const dispatch = useAppDispatch()
    const news = useAppSelector(allNews);


    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    return (
        news.map((news) => {
            const newsMessage = apiUrl + '/' + news.image
            return (
                <Card
                    key={news.id}
                    sx={{
                        marginBottom: "10px",
                        boxShadow: 2,
                        borderRadius: "8px",
                    }}
                >
                    <Box sx={{flexGrow: 1, display: "flex"}}>
                        {news.image ? (
                            <CardActions>
                                <CardMedia
                                    style={{width: '30%'}}
                                    component="img"
                                    image={newsMessage}
                                    title={news.title}
                                />
                            </CardActions>
                        ) : <CardActions>
                            <CardMedia
                                style={{width: '30%'}}
                                component="img"
                                image={picture}
                                title={news.title}
                            />
                        </CardActions>}
                        <CardContent sx={{width: 300}}>
                            <Typography gutterBottom sx={{fontSize: 20}}>
                                Title: {news.title}
                            </Typography>
                            <Typography gutterBottom sx={{fontSize: 18}}>
                                Created at: {dayjs(news.created_at).format('YYYY-MM-DD HH:mm')}
                            </Typography>
                        </CardContent>
                    </Box>
                    <CardContent sx={{width: 300}}>
                        <Link style={{textDecoration: 'none'}} to='/news'>Read full post</Link>
                    </CardContent>
                    <CardContent sx={{width: 300}}>
                        <Button style={{textDecoration: 'none'}} type="button">Delete</Button>
                    </CardContent>
                </Card>
            )
        }

    ));
};

export default News;
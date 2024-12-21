import {createSlice} from "@reduxjs/toolkit";
import {News} from "../../types";
import {createNews, deleteNews, getNews, getNewsId} from "./newsThunk.ts";
import {RootState} from "../../app/store.ts";

interface NewsSlice {
    news: News[];
    newsId: News | null
    createLoading: boolean;
    getLoading: boolean;
    deleteLoading: boolean;
}

const initialState: NewsSlice = {
    news: [],
    newsId: null,
    createLoading: false,
    getLoading: false,
    deleteLoading: false,
}


export const allNews = (state: RootState) => state.news.news;
export const newsId= (state: RootState) => state.news.newsId;
export const isCreate = (state: RootState) => state.news.createLoading;
export const deleteLoading = (state: RootState) => state.news.deleteLoading;
export const getLoading = (state: RootState) => state.news.getLoading;

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNews.pending, (state) => {
                state.getLoading = true;
            })
            .addCase(getNews.fulfilled, (state, {payload: news}) => {
                state.getLoading = false;
                state.news = news;
            })
            .addCase(getNews.rejected, (state) => {
                state.getLoading = false;
            })
            .addCase(getNewsId.pending, (state) => {
                state.getLoading = true;
            })
            .addCase(getNewsId.fulfilled, (state, {payload: newsId}) => {
                state.getLoading = false;
                state.newsId = newsId;
            })
            .addCase(getNewsId.rejected, (state) => {
                state.getLoading = false;
            })
            .addCase(createNews.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createNews.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createNews.rejected, (state) => {
                state.createLoading = false;
            })
            .addCase(deleteNews.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteNews.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteNews.rejected, (state) => {
                state.deleteLoading = false;
            });
    }
})

export const newsReducer = newsSlice.reducer;
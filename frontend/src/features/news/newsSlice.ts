import {createSlice} from "@reduxjs/toolkit";
import {News} from "../../types";
import {createNews, deleteNews, getNews} from "./newsThunk.ts";
import {RootState} from "../../app/store.ts";

interface NewsSlice {
    news: News[];
    createLoading: boolean;
    getLoading: boolean;
    deleteLoading: boolean;
}

const initialState: NewsSlice = {
    news: [],
    createLoading: false,
    getLoading: false,
    deleteLoading: false,
}

export const allNews = (state: RootState) => state.news.news;
export const isCreate = (state: RootState) => state.news.createLoading;

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
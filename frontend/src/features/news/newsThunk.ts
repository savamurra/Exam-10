import {createAsyncThunk} from "@reduxjs/toolkit";
import {News, NewsWithoutId} from "../../types";
import axiosAPI from "../../axiosAPI.ts";

export const getNews = createAsyncThunk<News[], void>(
    'news/getNews', async () => {
        const newsResponse = await axiosAPI<News[]>("/news");
        return newsResponse.data || [];
    }
);

export const createNews = createAsyncThunk<void, NewsWithoutId>("news/createNews", async (news) => {
    const formData = new FormData();

    const keys = Object.keys(news) as (keyof NewsWithoutId)[];

    keys.forEach((key) => {
        const value = news[key];

        if (value !== null) {
            formData.append(key, value);
        }
    });

    await axiosAPI.post("/news", formData);
});
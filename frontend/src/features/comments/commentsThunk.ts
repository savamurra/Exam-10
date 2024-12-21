import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentWithoutId, Comment} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import axiosApi from "../../axiosAPI.ts";

export const getComments = createAsyncThunk<Comment[], string>(
    'comment/getComments', async (comments_id:string) => {
        const commentsResponse = await axiosAPI<Comment[]>(`/comments?comments_id=${comments_id}`);
        return commentsResponse.data || [];
    }
);

export const createComments = createAsyncThunk<void, CommentWithoutId>("comment/createComments", async (comment) => {
    await axiosAPI.post("/comments", comment);
});

export const deleteComments = createAsyncThunk<void, string>('comment/deleteComments', async (id: string) => {
    await axiosApi.delete(`/comments/${id}`);
});

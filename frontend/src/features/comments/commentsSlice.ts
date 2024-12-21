import { createSlice} from "@reduxjs/toolkit";
import {createComments, deleteComments, getComments} from "./commentsThunk.ts";
import {Comment} from "../../types";
import {RootState} from "../../app/store.ts";

interface CommentsSliceState {
    comments: Comment[];
    createLoading: boolean;
    getLoading: boolean;
    deleteLoading: boolean;
}

const initialState: CommentsSliceState =  {
    comments: [],
    createLoading: false,
    getLoading: false,
    deleteLoading: false
}

export const isCreate = (state: RootState) => state.news.createLoading;
export const isLoading  =  (state: RootState) => state.comments.getLoading
export const isDelete = (state: RootState) => state.comments.deleteLoading
export const allComments = (state: RootState) => state.comments.comments


const commentsSlice = createSlice({
    name: 'comment',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.getLoading = true;
            })
            .addCase(getComments.fulfilled, (state, {payload: comments}) => {
                state.getLoading = false;
                state.comments = comments;
            })
            .addCase(getComments.rejected, (state) => {
                state.getLoading = false;
            })
            .addCase(createComments.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createComments.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createComments.rejected, (state) => {
                state.createLoading = false;
            })
            .addCase(deleteComments.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteComments.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteComments.rejected, (state) => {
                state.deleteLoading = false;
            });
    }
})

export const commentsReducer = commentsSlice.reducer
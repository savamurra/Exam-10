import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {CommentWithoutId} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {createComments, getComments} from "../commentsThunk.ts";
import {isCreate} from "../commentsSlice.ts";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";

const initialState = {
    comments_id: "",
    author: "",
    comments_text: "",
}
interface Props {
    id: string;
}
const CommentsForm: React.FC<Props> = ({id}) => {
    const [form, setForm] = useState<CommentWithoutId>(initialState);
    const dispatch = useAppDispatch();
    const createLoading = useAppSelector(isCreate);
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form,
            comments_id: id,
            [name]: value});
    };



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.comments_text.trim().length === 0 || !form.comments_id) {
            alert('Вы не заполнили поля');
        } else {
            await dispatch(createComments(form));
            setForm(initialState);
            await dispatch(getComments(id));
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Box
                sx={{
                    flexGrow: 1,
                    maxWidth: 600,
                    margin: "auto",
                    border: "3px solid DarkViolet",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <TextField
                    sx={{width: "100%", marginBottom: "10px"}}
                    id="author"
                    label="Author"
                    name="author"
                    value={form.author}
                    variant="outlined"
                    onChange={inputHandler}
                />
                <TextField
                    sx={{width: "100%", marginBottom: "10px"}}
                    id="comments_text"
                    label="Comments"
                    name="comments_text"
                    value={form.comments_text}
                    variant="outlined"
                    onChange={inputHandler}
                />
                <Button
                    color="secondary"
                    type="submit"
                    variant="contained"
                    sx={{width: "100%"}}
                    disabled={createLoading}
                >
                    {createLoading ? <Spinner/> : null}
                    Send
                </Button>
            </Box>
        </form>
    );
};

export default CommentsForm;
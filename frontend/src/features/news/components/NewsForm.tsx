import {useState} from "react";
import {NewsWithoutId} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {createNews, getNews} from "../newsThunk.ts";
import {Box, Button, TextField} from "@mui/material";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import {isCreate} from "../newsSlice.ts";

const initialState = {
    title: "",
    description: "",
    image: null,
}

const NewsForm = () => {
    const [form, setForm] = useState<NewsWithoutId>(initialState);
    const [clearInput, setClearInput] = useState<string>("");
    const dispatch = useAppDispatch();
    const createLoading = useAppSelector(isCreate);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0] ? files[0] : null,
            }))
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.title.trim().length === 0 || form.description.trim().length === 0) {
            alert('Вы не заполнили поля');
        } else {
            await dispatch(createNews(form));
            setForm(initialState);
            setClearInput(String(Date.now()));
            await dispatch(getNews());
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
                    id="title"
                    label="Title"
                    name="title"
                    value={form.title}
                    variant="outlined"
                    onChange={inputHandler}
                    required
                />
                <TextField
                    sx={{width: "100%", marginBottom: "10px"}}
                    id="description"
                    label="Description"
                    name="description"
                    value={form.description}
                    variant="outlined"
                    onChange={inputHandler}
                />
                <FileInput name="image" label="Image" onGetFile={fileEventChangeHandler} resetInput={clearInput}/>
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

export default NewsForm;
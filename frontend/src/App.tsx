import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import News from "./features/news/components/News.tsx";
import NewsForm from "./features/news/components/NewsForm.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";


const App = () => {


    return (
        <>
            <header>
                <Navbar/>
            </header>
            <Container>
                <Routes>
                    <Route path="/" element={<News/>}/>
                    <Route path='/newsForm' element={<NewsForm/>}/>
                </Routes>
            </Container>
        </>
    )
};

export default App

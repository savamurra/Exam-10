import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import News from "./features/news/components/News.tsx";


const App = () => {


  return (
    <>
      <Container>
          <Routes>
              <Route path="/" element={<News/>} />
          </Routes>
      </Container>
    </>
  )
};

export default App

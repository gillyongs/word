import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./Upload";
import Word from "./Word";
import WordPlus from "./WordPlus";
import WordEdit from "./WordEdit";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/word" element={<Word />} />
        <Route path="/wordplus" element={<WordPlus />} />
        <Route path="/wordedit/:id" element={<WordEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

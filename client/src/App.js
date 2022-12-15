import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieSearch from "./components/page/MovieSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MovieSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

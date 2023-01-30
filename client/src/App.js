import { BrowserRouter, Routes, Route } from "react-router-dom"
import Add from "./components/Add";
import Show from "./components/Show";
import './css/bootstrap.min.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Add />}/>
        <Route path="/show/:id" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
}

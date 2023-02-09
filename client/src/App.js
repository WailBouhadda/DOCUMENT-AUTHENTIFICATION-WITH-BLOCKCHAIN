import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import List from "./components/List";
import Update from "./components/Update";
import Main from "./Main";

export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-[1650px] m-auto overflow-hidden">
     
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/add" element={<Add />}/>
            <Route path="/list" element={<List />} />
            <Route path="/update" element={<Update />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  ) 
}

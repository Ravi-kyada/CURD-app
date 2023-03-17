import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import AddEdit from "./components/AddEdit";
import View from "./components/View";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addContact" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

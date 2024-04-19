import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import UsersPage from "./components/UserPage/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users-page" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

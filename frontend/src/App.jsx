import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import UsersPage from "./components/Users/UsersListPage/UsersPage";
import UserDetailPage from "./components/Users/UserDetailPage/UserDetailPage";
import UserDeletePage from "./components/Users/UserDeletePage/UserDeletePage";
import UserEditPage from "./components/Users/UserEditPage/UserEditPage";
import UserCreatePage from "./components/Users/UserCreatePage/UserCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users-page" element={<UsersPage />} />
        <Route path="/users/:userId/cards" element={<UserDetailPage />} />
        <Route path="/users/:userId/delete" element={<UserDeletePage />} />
        <Route path="/users/:userId/edit" element={<UserEditPage />} />
        <Route path="/users/create" element={<UserCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

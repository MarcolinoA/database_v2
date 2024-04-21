import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import UsersPage from "./components/UserPage/UsersPage";
import UserPersonalInfo from "./components/UserPersonalInfo/UserPersonalInfo";
import CreateSchedule from "./components/CreateSchedule/CreateSchedule";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users-page" element={<UsersPage />} />
        <Route path="/users-page/user-personal-info" element={<UserPersonalInfo />} />
        <Route path="/create-schedule-page" element={<CreateSchedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

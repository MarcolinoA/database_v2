import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import UsersPage from "./components/Users/UserPage/UsersPage.jsx";
import CreateScheduleInfo from "./components/ScheduleInfo/CreateScheduleInfo/CreateScheduleInfo.jsx";
import DeleteScheduleInfo from "./components/ScheduleInfo/DeleteScheduleInfo/DeleteScheduleInfo.jsx";
import EditScheduleInfo from "./components/ScheduleInfo/EditScheduleInfo/EditScheduleInfo.jsx";
import AddExercises from "./components/Schedule/AddExercises/AddExercises.jsx";
import ViewSchedule from "./components/Schedule/ViewSchedule/ViewSchedule.jsx";
import UserPersonalInfo from "./components/Users/UserPersonalInfo/UserPersonalInfo.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users-page" element={<UsersPage />} />
        <Route path="/user-personal-info/:id" element={<UserPersonalInfo />} />

        <Route path="/create-schedule-page" element={<CreateScheduleInfo />} />
        <Route path="/delete-schedule-page/:id" element={<DeleteScheduleInfo /> } />
        <Route path="/edit-schedule-page/:id" element={<EditScheduleInfo />} />

        <Route path="/view-schedule-page" element={<ViewSchedule />} />
        <Route path="/add-exercises-page" element={<AddExercises />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

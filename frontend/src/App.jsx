import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

import UserDetailPage from "./components/Users/UserDetailPage/UserDetailPage";
import UserDeletePage from "./components/Users/UserDeletePage/UserDeletePage";
import UserEditPage from "./components/Users/UserEditPage/UserEditPage";
import UserCreatePage from "./components/Users/UserCreatePage/UserCreatePage";
import ScheduleDeletePage from "./components/Schedule/ScheduleDeletePage/ScheduleDeletePage";
import ScheduleEditPage from "./components/Schedule/ScheduleEditPage/ScheduleEditPage";
import ScheduleCreatePage from "./components/Schedule/ScheduleCreatePage/ScheduleCreatePage";
import ScheduleViewPage from "./components/Schedule/ScheduleViewPage/ScheduleViewPage";
import ExercisesListPage from "./components/Exercises/ExercisesListPage/ExercisesListPage";
import ExerciseDeletePage from "./components/Exercises/ExercisesDeletePage/ExerciseDeletePage";
import ExerciseCreatePage from "./components/Exercises/ExercisesCreatePage/ExercisesCreatePage";
import ExerciseEditPage from "./components/Exercises/ExerciseEditPage/ExerciseEditPage";
import UsersListPage from "./components/Users/UsersListPage/UsersListPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users-page" element={<UsersListPage />} />
        <Route path="/users/:userId/schedules" element={<UserDetailPage />} />
        <Route path="/users/:userId/delete" element={<UserDeletePage />} />
        <Route path="/users/:userId/edit" element={<UserEditPage />} />
        <Route path="/users/create" element={<UserCreatePage />} />

        <Route
          path="/users/:userId/schedules/create"
          element={<ScheduleCreatePage />}
        />
        <Route
          path="/users/:userId/schedules/:scheduleId/delete"
          element={<ScheduleDeletePage />}
        />
        <Route
          path="/users/:userId/schedules/:scheduleId/edit"
          element={<ScheduleEditPage />}
        />
        <Route
          path="/users/:userId/schedules/:scheduleId/view"
          element={<ScheduleViewPage />}
        />

        <Route path="/exercises-list" element={<ExercisesListPage />} />
        <Route path="/exercise/create" element={<ExerciseCreatePage />} />
        <Route path="/exercises/:exerciseId/delete" element={<ExerciseDeletePage /> } />
        <Route path="/exercises/:exerciseId/edit" element={<ExerciseEditPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

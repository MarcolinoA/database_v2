import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ExercisesListPage from "./components/Exercises/ExercisesListPage/ExercisesListPage";
import ExerciseDeletePage from "./components/Exercises/ExercisesDeletePage/ExerciseDeletePage";
import ExerciseCreatePage from "./components/Exercises/ExercisesCreatePage/ExercisesCreatePage";
import ExerciseEditPage from "./components/Exercises/ExerciseEditPage/ExerciseEditPage";
import UsersList from "./components/Users/UsersList/UsersList";
import UserDelete from "./components/Users/UserDelete/UserDelete";
import UserEdit from "./components/Users/UserEdit/UserEdit";
import UserCreate from "./components/Users/UserCreate/UserCreate";
import UserSchedule from "./components/Users/UserSchedule/UserSchedule";
import ScheduleCreate from "./components/Schedule/ScheduleCreate/ScheduleCreate";
import ScheduleDelete from "./components/Schedule/ScheduleDelete/ScheduleDelete";
import ScheduleEdit from "./components/Schedule/ScheduleEdit/ScheduleEdit";
import ViewSchedule from "./components/Schedule/ViewSchedule/ScheduleViewPage";
import ScheduleExercisesList from "./components/Schedule/ScheduleExercisesList/ScheduleExercisesList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users-page" element={<UsersList />} />
        <Route path="/users/:userId/delete" element={<UserDelete />} />
        <Route path="/users/:userId/edit" element={<UserEdit />} />
        <Route path="/users/create" element={<UserCreate />} />

        <Route path="/users/:userId/schedules" element={<UserSchedule /> } />
        <Route path="/users/:userId/schedules/create" element={<ScheduleCreate />} />
        <Route path="/users/:userId/schedules/:scheduleId/delete" element={<ScheduleDelete />} />
        <Route path="/users/:userId/schedules/:scheduleId/edit" element={<ScheduleEdit />} />
        <Route path="/users/:userId/schedules/:scheduleId/view" element={<ViewSchedule />} />
        <Route path="/users/:userId/schedules/:scheduleId/exerciseslist" element={<ScheduleExercisesList />} />

        <Route path="/exercises-list" element={<ExercisesListPage />} />
        <Route path="/exercise/create" element={<ExerciseCreatePage />} />
        <Route path="/exercises/:exerciseId/delete" element={<ExerciseDeletePage /> } />
        <Route path="/exercises/:exerciseId/edit" element={<ExerciseEditPage /> } />
        <Route path="/exercises/groups/:groupName" element={<ExerciseEditPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

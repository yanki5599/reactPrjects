import { Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage/NotesPage";
import AddNotePage from "./pages/AddNotePage/AddNotePage";
import EditNotePage from "./pages/EditNotePage/EditNotePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import PrivatePage from "./pages/PrivatePage/PrivatePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>

        <Route
          path="/notes"
          element={
            <PrivatePage>
              <NotesPage />
            </PrivatePage>
          }
        ></Route>

        <Route
          path="/notes/create"
          element={
            <PrivatePage>
              <AddNotePage />
            </PrivatePage>
          }
        ></Route>
        <Route
          path="/notes/edit/:id"
          element={
            <PrivatePage>
              <EditNotePage />
            </PrivatePage>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/notfound" element={<NotFoundPage />}></Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;

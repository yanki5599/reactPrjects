import { Route, RouterProvider, Routes } from "react-router-dom";
import Reception from "./pages/Reception/Reception";
import Floor from "./pages/Floor/Floor";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/Layout/Layout";
import Forbidden from "./pages/Forbidden/Forbidden";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Reception />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route
          path="/floor/:id"
          element={
            <ProtectedRoute>
              <Floor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

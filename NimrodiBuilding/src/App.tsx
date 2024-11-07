import { Route, Routes } from "react-router-dom";
import Reception from "./pages/Reception/Reception";
import Floor from "./pages/Floor/Floor";
import Layout from "./components/Layout/Layout";
import Forbidden from "./pages/Forbidden/Forbidden";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Reception />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route
            path="/floor/:index"
            element={
              <ProtectedRoute>
                <Floor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import BodyWeight from "./pages/BodyWeight";
import Workouts from "./pages/Workouts";
import Progress from "./pages/Progress";
import Records from "./pages/Records";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/body-weight"
            element={<BodyWeight />}
          />

          <Route
            path="/workouts"
            element={<Workouts />}
          />

          <Route
            path="/progress"
            element={<Progress />}
          />

          <Route
            path="/records"
            element={<Records />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
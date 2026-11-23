import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyEntries from "./pages/MyEntries";
import AllEntries from "./pages/AllEntries";
import CreateEntry from "./pages/CreateEntry";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-entries"
          element={
            <ProtectedRoute>
              <MyEntries />
            </ProtectedRoute>
          }
        />
        <Route path="/entries" element={<AllEntries />} />
        <Route
          path="/create-entry"
          element={
            <ProtectedRoute>
              <CreateEntry />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

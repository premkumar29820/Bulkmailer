import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Mailpage from "./components/Mailpage";
import History from "./components/History";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={() => navigate("/send-mail")} />}
      />

      <Route
        path="/send-mail"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-[#F5FAFB]">

              <nav className="border-b border-[#1B5260] bg-[#163F49] px-4 py-4 text-white shadow-md sm:px-8">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h1 className="text-xl font-bold text-white">
                      Bulk Mail
                    </h1>

                    <p className="text-xs text-[#B8DDE3]">
                      Bulk Email Automation System
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={() => navigate("/send-mail")}
                      className="rounded-lg bg-[#277485] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2F8FA3]"
                    >
                      Send Mail
                    </button>

                    <button
                      onClick={() => navigate("/history")}
                      className="rounded-lg bg-[#1F4F5B] px-4 py-2 text-sm font-semibold text-[#D5E9ED] transition hover:bg-[#277485] hover:text-white"
                    >
                      History
                    </button>

                    <button
                      onClick={logout}
                      className="rounded-lg bg-[#1F4F5B] px-4 py-2 text-sm font-semibold text-[#D5E9ED] transition hover:bg-[#B23A48] hover:text-white"
                    >
                      Logout
                    </button>

                  </div>

                </div>
              </nav>

              <Mailpage />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-[#F5FAFB]">

              <nav className="border-b border-[#1B5260] bg-[#163F49] px-4 py-4 text-white shadow-md sm:px-8">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h1 className="text-xl font-bold text-white">
                      Bulk Mail
                    </h1>

                    <p className="text-xs text-[#B8DDE3]">
                      Email Management System
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={() => navigate("/send-mail")}
                      className="rounded-lg bg-[#1F4F5B] px-4 py-2 text-sm font-semibold text-[#D5E9ED] transition hover:bg-[#277485] hover:text-white"
                    >
                      Send Mail
                    </button>

                    <button
                      onClick={() => navigate("/history")}
                      className="rounded-lg bg-[#277485] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2F8FA3]"
                    >
                      History
                    </button>

                    <button
                      onClick={logout}
                      className="rounded-lg bg-[#1F4F5B] px-4 py-2 text-sm font-semibold text-[#D5E9ED] transition hover:bg-[#B23A48] hover:text-white"
                    >
                      Logout
                    </button>

                  </div>

                </div>
              </nav>

              <History />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/send-mail" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;
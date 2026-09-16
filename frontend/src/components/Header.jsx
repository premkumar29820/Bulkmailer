import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false); // dropdown state for profile menu
  const navigate = useNavigate();

  // logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setShowDropdown(false);
  };

  return (
    <header className="border-b border-[#1B5260] bg-[#163F49] text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#277485] shadow-sm">
            <span className="text-lg font-bold">✉️</span>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Post a Letter
            </h1>

            <p className="text-xs text-[#B8DDE3]">
              Campaign Studio
            </p>
          </div>
        </div>

        {/* Navigation + Profile */}
        <div className="flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <button
                  onClick={() => navigate("/send-mail")}
                  className="text-sm font-medium text-[#D5E9ED] transition hover:text-white"
                >
                  Compose
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/history")}
                  className="text-sm font-medium text-[#D5E9ED] transition hover:text-white"
                >
                  History
                </button>
              </li>
            </ul>
          </nav>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#277485] text-sm font-semibold text-white transition hover:bg-[#2F8FA3] shadow-sm"
            >
              U
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-[#D5E9ED] bg-white text-[#163F49] shadow-xl">

                <div className="border-b border-[#D5E9ED] bg-[#F5FAFB] px-4 py-3">
                  <p className="text-xs font-medium text-[#277485]">
                    user@gmail.com
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-[#B23A48] transition hover:bg-[#FDECEC]"
                >
                  Sign out
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [status, setstatus] = useState(false); // login process state

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror(""); // clear previous errors
    setstatus(true); // start login

    try {
      const response = await axios.post(`${import.meta.env.API_URL}/login`, {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // save jwt token
        onLogin(); // notify parent component of successful login
      }
    } catch (error) {
      seterror(
        error.response?.data?.message || "Login failed" // show backend error or default message
      );
    }

    setstatus(false); // end login process
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#E8F3F5] via-[#D5E9ED] to-[#F5FAFB] flex items-center justify-center px-4">


      <div className="w-full max-w-md relative z-10">

        {/* Card Container */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

          {/* Header Section - Gradient background */}
          <div className="bg-[#277485] px-8 py-12 text-center">
            {/* Logo */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white mx-auto mb-4 shadow-lg">
              <span className="text-3xl">✉️</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Mail Sender
            </h1>
            <p className="text-blue-100 text-sm">
              Manage bulk email campaigns with ease
            </p>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            <form onSubmit={handlesubmit} className="space-y-5">

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-[#B8DDE3] bg-[#F5FAFB] text-gray-900 placeholder-gray-500 outline-none transition duration-200 focus:bg-white focus:border-[#277485] focus:ring-2 focus:ring-[#277485]/20"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-[#B8DDE3] bg-[#F5FAFB] text-gray-900 placeholder-gray-500 outline-none transition duration-200 focus:bg-white focus:border-[#277485] focus:ring-2 focus:ring-[#277485]/20"
                  required
                />
              </div>

              {/* Error Message with Icon */}
              {error && (
                <div className="rounded-lg bg-[#E8F3F5] border border-[#B8DDE3] p-3 flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#277485] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-sm font-medium text-[#1B5260]">
                    {error}
                  </p>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#277485] " />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <button type="button" className="text-[#277485] hover:text-[#1B5260] font-medium transition">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button - Gradient with animation */}
              <button
                type="submit"
                disabled={status}
                className="w-full bg-[#277485]  text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m14-4V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
                    </svg>
                    Sign In
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Footer Section */}
          <div className="px-8 py-4 border-t border-gray-200 bg-gray-50 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <button className="ml-1 text-[#277485] hover:text-[#1B5260] font-semibold transition">
                Contact Administrator
              </button>
            </p>
          </div>

        </div>

        {/* Security Badge */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Secure login • Protected by SSL encryption</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Login;
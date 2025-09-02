import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Developer"); // default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const BASE_URL = "https://clientdriven-backend-ey3f.onrender.com";
      let response;

      if (isSignUp) {
        response = await axios.post(`${BASE_URL}/api/auth/register`, {
          name,
          email,
          password,
          role,
        });
      } else {
        response = await axios.post(`${BASE_URL}/api/auth/login`, {
          email,
          password,
        });
      }

      const { token, user } = response.data;

      // Save token locally
      localStorage.setItem("token", token);

      // Show toast on successful login/signup
      toast.success(`Welcome ${user.name}!`, {
        position: "top-center", // center toast horizontally
        style: {
          transform: "translateY(50vh)", // vertical center
        },
        duration: 1000, // auto-dismiss after 3s
      });

      // Pass user as props to Dashboard , i am not using context here.
      navigate("/dashboard", { state: { user } });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong", {
        position: "top-center",
        style: { transform: "translateY(50vh)" },
        duration: 1000,
      });
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-10 py-10 rounded-3xl border-2 border-gray w-full max-w-md mx-auto overflow-y-auto h-[90vh]">
      {/* Add Toaster once here */}
      {/* <Toaster /> do baar aane lagega */}

      <h1 className="text-4xl font-semibold text-center">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h1>
      <p className="font-medium text-lg text-gray-500 text-center mt-2">
        {isSignUp
          ? "Sign up to get started with your account"
          : "Welcome Back! Please enter your details"}
      </p>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {isSignUp && (
          <>
            <div>
              <label className="text-lg font-medium">Full Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your full name"
              />
            </div>
          </>
        )}

        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold w-full"
        >
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <p className="text-center text-gray-500 mt-4">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          className="text-violet-500 cursor-pointer font-medium"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default Form;

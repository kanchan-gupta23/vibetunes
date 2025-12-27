import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
function UserLogin() {
  const { getToken } = useContext(Context);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://vibetune-cr9l.onrender.com/user/userLogin`,
        value
      );
      getToken(response.data.token);
      toast("congrats Login Successfully");
      navigate("/songs");
      console.log(response.data);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/021/995/504/large_2x/music-night-party-background-illustration-ai-generative-free-photo.jpg')] bg-cover bg-center px-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/30 w-full max-w-md p-8 rounded-2xl shadow-xl text-white space-y-6 border border-white/30"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">User Login</h1>
          <p className="text-sm text-white/70">Welcome back! Please login.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-white/90"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={value.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-white/90"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={value.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white/30 hover:bg-white/40 text-white py-2 rounded-lg font-semibold transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default UserLogin;

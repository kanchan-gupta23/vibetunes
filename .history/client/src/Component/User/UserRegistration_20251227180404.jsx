import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

function UserRegistration() {
  const { getToken } = useContext(Context);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fullName: "",
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
        `https://vibetune-cr9l.onrender.com/user/user`,
        value
      );
      console.log(response.data);
      toast.success("Welcome, Registration successfully");
      getToken(response.data.token);
      navigate("/songs");
      // You can also show success toast or redirect here
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="flex bg-no-repeat bg-cover justify-center items-center min-h-screen bg-[url(https://static.vecteezy.com/system/resources/previews/021/995/504/large_2x/music-night-party-background-illustration-ai-generative-free-photo.jpg)] px-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md text-zinc-200 w-full max-w-md p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-800">Create Account</h1>
          <p className="text-sm text-zinc-500 mt-1">Join us in one step!</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="fullName" className="block font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={value.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={value.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={value.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition duration-300 font-semibold"
        >
          Register
        </button>

        <p className="text-sm text-center text-zinc-500">
          Already have an account?{" "}
          <a
            href="/userLogin"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default UserRegistration;

import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

import { useNavigate } from "react-router-dom";

function Admin() {
  const { setSongs, AdminAuthentication } = useContext(Context);
  const [value, setValue] = useState({
    name: "",
    genre: "",
    artistName: "",
    artistBio: "",
    audio: null,
  });
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    setValue((prev) => {
      return { ...prev, [name]: value, audio: files ? files[0] : prev.audio };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("genre", value.genre);
    formData.append("artistName", value.artistName);
    formData.append("artistBio", value.artistBio);
    formData.append("audio", value.audio);

    try {
      const response = await axios.post(
        `https://vibetune-cr9l.onrender.com/music/createMusic`,
        formData,
        {
          headers: {
            Authorization: AdminAuthentication,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      setSongs((prev) => [...prev, response.data]);

      setValue({
        name: "",
        genre: "",
        artistName: "",
        artistBio: "",
        audio: null,
      });
      navigate("/songs");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage:
          'url("https://static.vecteezy.com/system/resources/previews/021/995/504/large_2x/music-night-party-background-illustration-ai-generative-free-photo.jpg")',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/30 text-white w-full max-w-lg p-8 rounded-2xl shadow-xl space-y-6 border border-white/40"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Add New Music</h1>
          <p className="text-sm text-white/70">Upload your new track</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-white/90"
            >
              Song Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Song Title"
              value={value.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="genre"
              className="block text-lg font-semibold text-white/90"
            >
              Genre
            </label>
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={value.genre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="audio"
              className="block text-lg font-semibold text-white/90"
            >
              Upload Audio File
            </label>
            <input
              type="file"
              name="audio"
              accept="audio/*"
              onChange={handleChange}
              required
              className="w-full text-white bg-white/20 placeholder-white/60 border border-white/30 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="artistName"
              className="block text-lg font-semibold text-white/90"
            >
              Artist Name
            </label>
            <input
              type="text"
              name="artistName"
              placeholder="Artist Name"
              value={value.artistName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="artistBio"
              className="block text-lg font-semibold text-white/90"
            >
              Artist Bio
            </label>
            <textarea
              name="artistBio"
              placeholder="Tell us about the artist"
              value={value.artistBio}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white/30 hover:bg-white/40 text-white py-2 rounded-lg transition duration-300 font-semibold"
        >
          Submit Music
        </button>
      </form>
    </div>
  );
}

export default Admin;

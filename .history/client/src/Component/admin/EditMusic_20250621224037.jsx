import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";

function EditMusic() {
  const params = useParams();
  const navigate = useNavigate();

  const { setSongs, AdminAuthentication } = useContext(Context);
  const [value, setValue] = useState({
    name: "",
    genre: "",
    artistName: "",
    artistBio: "",
    audio: null,
  });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    setValue((prev) => {
      return { ...prev, [name]: value, audio: files ? files[0] : prev.audio };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("genre", value.genre);
      formData.append("artistName", value.artistName);
      formData.append("artistBio", value.artistBio);

      if (value.audio) {
        formData.append("audio", value.audio); // Only if new audio uploaded
      }

      const response = await axios.put(
        `http://localhost:2000/music/updateSongById/${params._id}`,
        formData,
        {
          headers: {
            Authorization: AdminAuthentication,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setValue({
        name: "",
        genre: "",
        artistName: "",
        artistBio: "",
        audio: null,
      });

      console.log(response.data);
      navigate("/songs");
    } catch (error) {
      console.log(error);
    }
  };

  const getMusicById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/music/getSongById/${params._id}`,
        {
          headers: {
            Authorization: AdminAuthentication,
          },
        }
      );
      setValue({
        name: response.data.name || "",
        genre: response.data.genre || "",
        artistName: response.data.artist?.name || "",
        artistBio: response.data.artist?.bio || "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMusicById();
  }, []);
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage:
          'url("https://static.vecteezy.com/system/resources/previews/021/995/504/large_2x/music-night-party-background-illustration-ai-generative-free-photo.jpg")',
      }}
    >
      <form
        onSubmit={handleUpdate}
        className="backdrop-blur-md bg-white/30 text-white w-full max-w-lg p-8 rounded-2xl shadow-xl space-y-6 border border-white/40"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Update Music</h1>
          <p className="text-sm text-white/70">Update your track</p>
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

export default EditMusic;

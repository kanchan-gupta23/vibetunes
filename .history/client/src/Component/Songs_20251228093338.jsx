import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { Context } from "../context/Context";
import { FaSearch } from "react-icons/fa";
import IdSongs from "./IdSongs";
import QuerySongs from "./QuerySongs";
import AllSongs from "./AllSongs";
import { Link } from "react-router-dom";

// Example avatar mood options
const moodOptions = [
  {
    genre: "happy",
    avatar:
      "https://pic.funnygifsbox.com/uploads/2020/12/funnygifsbox.com-2020-12-19-15-08-02-7.gif", // happy face
  },
  {
    genre: "sad",
    avatar:
      "https://i.pinimg.com/originals/4d/d7/60/4dd76056feee92a2f0e669afc2361678.gif", // sad face
  },
  {
    genre: "chill",
    avatar:
      "https://i.pinimg.com/originals/f1/bd/14/f1bd1434e50d70458dedfe274b8f1184.gif", // you can replace with relaxed face
  },
  {
    genre: "religious",
    avatar:
      "https://hindu-philosophy.com/wp-content/uploads/2024/08/what-does-hinduism-say-about-cats-Ru.jpeg", // lightning bolt or energy
  },
  {
    genre: "romantic",
    avatar:
      "https://media.tenor.com/2MsCRIkSSgAAAAAM/peach-goma-goma-peach.gif", // heart face
  },
  {
    genre: "party",
    avatar:
      "https://i.pinimg.com/originals/b3/29/9f/b3299f01f2d738c620086602d77e7887.gif", // party hat
  },
];

function Songs() {
  const {
    setSongs,
    songs,
    setLikes,
    Music,
    user,
    idmusic,
    authenticationToken,
    Logout,
  } = useContext(Context);
  const [filtered, setFiltered] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [value, setValue] = useState("");
  const [query, setQuery] = useState([]);

  const getMoodMessage = () => {
    if (selectedMood) {
      if (selectedMood === "sad") {
        return `Aww, ${user.fullName} 😢 Too Bad Aapka mood ${selectedMood} Hai`;
      } else if (
        ["happy", "party", "religious", "chill", "romantic"].includes(
          selectedMood
        )
      ) {
        return `Good, ${user.fullName} 😄 Hoh Aaj Aap ${selectedMood} Hai`;
      } else {
        return `Toh Aa Gye Aap, ${user.fullName} 🌟 Chaliye Mood choose kariye`;
      }
    }

    return `Toh Aa Gye Aap, ${user.fullName} 🌟 Chaliye Mood choose kariye`;
  };

  // Add a debounce function to limit the number of API calls
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const handleQuery = async () => {
    try {
      const response = await axios.get(
        `https://vibetune-cr9l.onrender.com/music/getMusicQuery`,
        {
          headers: { Authorization: authenticationToken },
          params: {
            name: value,
            artistName: value,
          },
        }
      );
      console.log(response.data);
      console.log("before", value);
      setQuery(response.data);

      console.log("after", value);
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  };
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedValue) {
      handleQuery();
    }
  }, [debouncedValue, songs]);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };
  // 1. Fetch fresh songs when mood changes
  useEffect(() => {
    if (selectedMood) {
      Music(selectedMood); // just fetch
    }
  }, [selectedMood]);

  // 2. When songs are updated, filter based on mood
  useEffect(() => {
    if (selectedMood && songs.length > 0) {
      const filteredSongs = songs.filter((song) =>
        song.genre.toLowerCase().includes(selectedMood.toLowerCase())
      );
      setFiltered(filteredSongs);
      setValue("");
    }
  }, [songs, selectedMood]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-tr from-[#1e003b] via-[#2d006e] to-[#000000] py-10 px-5 text-white">
      <div className="w-full mb-2.5 flex justify-end gap-[3vw]  ">
        {/* <button
          onClick={Logout}
          className=" bg-red-700 hover:bg-red-800 text-white px-8 py-2 rounded-full font-bold transition-transform duration-300 shadow-2xl hover:scale-105"
        >
          Logout
        </button> */}
        {/* <Link
          to="/admin"
          className=" bg-red-700 hover:bg-red-800 text-white px-8 py-2 rounded-full font-bold transition-transform duration-300 shadow-2xl hover:scale-105"
        >
          Add new song
        </Link> */}
      </div>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-6 drop-shadow-md"
      >
        {getMoodMessage()}
      </motion.h1>

      {/* Mood Avatars */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {moodOptions.map((mood, index) => (
          <motion.div
            key={mood.genre}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodClick(mood.genre)}
            className={`flex flex-col items-center cursor-pointer transition-all ${
              selectedMood === mood.genre
                ? "drop-shadow-lg scale-110"
                : "opacity-80 hover:opacity-100"
            }`}
          >
            <img
              src={mood.avatar}
              alt={mood.label}
              className="w-20 h-20 rounded-full border-4 border-purple-400 hover:border-white transition"
            />
            <p className="mt-2 text-sm">{mood.genre}</p>
          </motion.div>
        ))}
      </div>
      {/* Search Panel */}
      <div className="w-screen flex justify-center my-8 ">
        <div className=" w-[50vw] flex justify-around h-[5vh]  rounded-2xl items-center border-2 ">
          <FaSearch className=" " />
          <input
            placeholder="Search Your favorite song"
            className="w-[90%] focus:border-none focus:outline-none  "
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleQuery(); // Press Enter to trigger query
            }}
          />
        </div>
      </div>
      {/* Songs Display */}
      <div>
        {/* If the value is empty and there is idmusic, show IdSongs */}
        {value !== "" && query.length > 0 ? (
          <QuerySongs query={query} />
        ) : value === "" && idmusic?.length > 0 ? (
          <IdSongs />
        ) : query.length > 0 ? (
          <QuerySongs query={query} />
        ) : idmusic?.length > 0 ? (
          <IdSongs />
        ) : (
          // Default to AllSongs when no query or idmusic is present
          <AllSongs />
        )}
      </div>
    </div>
  );
}

export default Songs;

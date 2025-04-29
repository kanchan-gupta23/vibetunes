import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { MdHeartBroken } from "react-icons/md";
import { Context } from "../context/Context";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Box = ({
  artistName,
  artistBio,
  setSongs,
  index,
  songName,
  likes,
  dislikes,
  songGenre,
  url,
  _id,
}) => {
  const {
    handleLikesOrDislikes,
    active,
    admin,

    AdminAuthentication,
  } = useContext(Context);
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);
  const deleteSong = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/music/delete/${id}`,
        {
          headers: {
            Authorization: AdminAuthentication,
          },
        }
      );
      toast.success(response.data.msg);
      setSelectedMood((prevMood) => prevMood);
      setSongs((prev) => prev.filter((song) => song._id !== _id));
      console.log(response.data);
    } catch (error) {
      // toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <motion.div
        key={_id}
        index={index}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white w-[100%] bg-opacity-10 rounded-2xl shadow-lg p-6 backdrop-blur-lg hover:scale-105 transition-transform duration-300 border border-white border-opacity-10"
      >
        {admin.email ? (
          <Link to={`/editmusic/${_id}`}>
            <FaEdit className="text-black absolute right-[3vw] text-2xl" />
          </Link>
        ) : (
          <></>
        )}
        {admin.email ? (
          <MdOutlineDeleteOutline
            onClick={() => {
              deleteSong(_id);
            }}
            className="text-black absolute right-1.5 text-2xl"
          />
        ) : (
          <></>
        )}

        <h2 className="text-2xl font-bold text-purple-500 truncate">
          {songName}
        </h2>
        <p className="text-sm text-purple-400 italic mt-1 capitalize">
          {songGenre}
        </p>

        <div className="mt-4">
          <audio key={url} controls className="w-full rounded-md shadow-sm">
            <source src={url} type="audio/mpeg" />
          </audio>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-lg text-zinc-500">{artistName}</h3>
          <p className="text-sm text-zinc-500">
            {artistBio.length > 40 ? artistBio.slice(0, 40) + "..." : artistBio}
          </p>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <FaHeart
              className={`text-3xl transition-all duration-300 ${
                active[_id] ? "text-red-500 scale-110" : "text-black"
              }`}
              onClick={() => {
                setLocalLikes((prev) => prev + 1);
                handleLikesOrDislikes("likes", _id, localLikes, localDislikes);
              }}
            />
            <p className="text-black">{localLikes}</p>
          </div>

          <div className="flex items-center gap-2">
            <MdHeartBroken
              onClick={() => {
                setLocalDislikes((prev) => prev + 1);
                handleLikesOrDislikes(
                  "dislikes",
                  _id,
                  localLikes,
                  localDislikes
                );
              }}
              className={`h-[4vh] w-[4vw] text-3xl transition-all duration-300 ${
                active[_id] ? "text-zinc-600 scale-110" : "text-black"
              }`}
            />
            <p className="text-black">{localDislikes}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Box;

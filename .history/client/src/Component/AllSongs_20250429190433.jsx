import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { Context } from "../context/Context";
import { FaHeart } from "react-icons/fa";
import { MdHeartBroken } from "react-icons/md";
import Box from "./Box";
const AllSongs = () => {
  const { setSongs, songs, user, authenticationToken } = useContext(Context);

  const allMusic = async () => {
    const response = await axios.get("http://localhost:2000/music/allMusic", {
      headers: { Authorization: authenticationToken },
    });
    console.log(response.data);
    setSongs(response.data);
  };
  useEffect(() => {
    allMusic();
  }, []);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[100%] gap-8 ">
      {songs.map((song, index) => (
        <Box
          setSongs={setSongs}
          key={index}
          _id={song._id}
          index={index}
          artistBio={song.artist.bio}
          artistName={song.artist.name}
          url={song.attachments.url}
          songName={song.name}
          songGenre={song.genre}
          likes={song.action.likes}
          dislikes={song.action.dislikes}
        />
      ))}
    </div>
  );
};

export default AllSongs;

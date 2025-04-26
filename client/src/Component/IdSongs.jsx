import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import Box from "./Box";
function IdSongs() {
  const { idmusic } = useContext(Context);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[100%] gap-8 ">
      {idmusic.map((song, index) => (
        <Box
          ref={audioref}
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
}

export default IdSongs;

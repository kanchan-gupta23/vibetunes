import React, { useState } from "react";
import Box from "./Box";

function QuerySongs({ query }) {
  return (
    <div
      ref={audioref}
      className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[100%] gap-8 "
    >
      {query.map((song, index) => (
        <Box
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

export default QuerySongs;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Context } from "../context/Context";

function Home() {
  const { user, admin } = useContext(Context);
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
      {/* Background Texture - A rough, rock inspired vibe */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1600195077075-2e1656f03a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10"
      >
        <h1 className="text-7xl md:text-8xl font-extrabold drop-shadow-2xl animate-pulse">
          Welcome, Vibe Tunes
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-300">
          Crank up the volume and feel your mood ignite!
        </p>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-10 flex flex-col md:flex-row gap-8 justify-center"
        >
          <Link
            to="/userLogin"
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-full font-bold transition-transform duration-300 shadow-2xl hover:scale-105"
          >
            User Login
          </Link>
          <Link
            to="/userRegistration"
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-full font-bold transition-transform duration-300 shadow-2xl hover:scale-105"
          >
            <p className="text-[1.5vh]">New User</p>
            User Registration
          </Link>
          {admin.email ? (
            <Link
              to="/adminLogin"
              className="bg-blue-900 hover:bg-blue-950 text-white px-8 py-4 rounded-full font-bold transition-transform duration-300 shadow-2xl hover:scale-105"
            >
              Admin Login
            </Link>
          ) : (
            <></>
          )}
        </motion.div>
      </motion.div>

      {/* Rocking Floating Icons */}
      <motion.div
        className="absolute bottom-10 left-10 text-red-500 text-5xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🤘
      </motion.div>
      <motion.div
        className="absolute top-12 right-12 text-yellow-500 text-6xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        🎸
      </motion.div>
    </div>
  );
}

export default Home;

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [idmusic, SetIdMusic] = useState([]);
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [active, setActive] = useState({});
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("AdminToken")
  );

  const AdminAuthentication = `Bearer ${adminToken}`;
  const authenticationToken = `Bearer ${token}`;
  const Logout = async () => {
    try {
      setToken("");
      localStorage.removeItem("Token");
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("Token", newToken);
    } else {
      console.log("Token not found");
    }
  };

  const getAdminToken = (adminToken) => {
    setAdminToken(adminToken);
    if (adminToken) {
      localStorage.setItem("AdminToken", adminToken);
    } else {
      console.log("Admin token not found");
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/user/userData`, {
        headers: { Authorization: authenticationToken },
      });
      console.log("userData", response.data);
      setUser(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/admin/adminData`,
        {
          headers: { Authorization: AdminAuthentication },
        }
      );
      console.log("adminData", response.data);
      setAdmin(response.data);
    } catch (error) {
      console.log("Error fetching admin data:", error);
    }
  };

  const Music = async (genre) => {
    try {
      const response = await axios.get(
        `http://localhost:2000/music/getMusicPrams/${genre}`,
        {
          headers: { Authorization: authenticationToken },
        }
      );
      console.log(response.data);
      toast.success(`your ${genre} songs are here`);
      setSongs(response.data);
      SetIdMusic(response.data);
    } catch (error) {
      console.log("Error fetching music:", error);
      toast.error(error.response.data.msg);
    }
  };
  const handleLikesOrDislikes = async (type, _id, likes, dislikes) => {
    try {
      const updatedLikes = type === "likes" ? likes + 1 : likes;
      const updatedDislikes = type === "dislikes" ? dislikes + 1 : dislikes;
      const payload = {
        type,
        _id,
        likes: updatedLikes,
        dislikes: updatedDislikes,
      };
      const response = await axios.put(
        "http://localhost:2000/music/actions",
        payload,
        {
          headers: { Authorization: authenticationToken },
        }
      );
      console.log(response.data);
      toast.success(response.data.msg);
      if (type == "likes") {
        setLikes((prev) => prev + 1);
      } else {
        setDislikes((prev) => prev + 1);
      }
      setActive((prevState) => ({
        ...prevState,
        [_id]: type, // Set the type (likes or dislikes) for this song's ID
      }));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  // Fetch user and admin data when the component mounts
  useEffect(() => {
    if (token) {
      getUser();
    }
    if (adminToken) {
      getAdmin();
    }
  }, [token, adminToken]);

  return (
    <Context.Provider
      value={{
        songs,
        setSongs,
        Music,
        idmusic,
        AdminAuthentication,
        getToken,
        user,
        authenticationToken,
        getAdminToken,
        admin,
        handleLikesOrDislikes,
        setLikes,
        likes,
        dislikes,
        active,
        Logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../providers/Socket";

const Home = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [roomId, setRoomId] = useState();

  const handleRoomJointed = useCallback(
    ({ roomId }) => {
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("jointed-room", handleRoomJointed);

    return () => {
      socket.off("jointed-room", handleRoomJointed);
    };
  }, [socket]);

  const handleJoinRoom = () => {
    socket.emit("join-room", { roomId: roomId, emailId: email });
  };

  return (
    <div className="homepage-container">
      <div className="input-container">
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="enter your emal here"
        />
        <input
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          type="text"
          placeholder="Enter room code"
        />
        <button onClick={handleJoinRoom}>Enter Room</button>
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io();

export default function SocketStatus() {
  const [status, setStatus] = useState("connected");

  useEffect(() => {
    socket.on("connect", () => setStatus("connected"));
    socket.on("disconnect", () => setStatus("disconnected"));
    socket.on("reconnect_attempt", () => setStatus("reconnecting"));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("reconnect_attempt");
    };
  }, []);

  if (status === "connected") return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 border border-yellow-400 px-4 py-2 rounded shadow">
      {status === "reconnecting" ? "Reconnecting to server..." : "Disconnected from server. Trying to reconnect..."}
    </div>
  );
}
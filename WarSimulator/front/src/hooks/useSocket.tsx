import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL: string = import.meta.env.VITE_SOCKET_URL as string;

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<ICandidate[]>([]);

  useEffect(() => {
    console.log(SERVER_URL);

    const socketInstance = io(SERVER_URL);
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected:", socketInstance.id);
      setConnected(true);
    });

    socketInstance.on("update-votes", (newCandidates: ICandidate[]) => {
      console.log("New candidates received:", newCandidates);
      setCandidates(newCandidates);
    });
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return {
    socket,
    connected,
    candidates,
  };
}

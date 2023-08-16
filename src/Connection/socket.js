import { io } from "socket.io-client";

let socket = io.connect("wss://onecorp.co.in:5000", {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 99999999,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
  forceNew: false,
});

export default socket;

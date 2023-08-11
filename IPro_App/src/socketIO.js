import { io } from "socket.io-client";
import ENV from "../ENV";
let socket = io(ENV.API_END_POINT);

export default socket;
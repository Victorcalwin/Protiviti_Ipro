import { io } from "socket.io-client";
import env from '../ENV';
let socket =io(env.API_END_POINT);

export default socket;
import io              from 'socket.io-client';
import { CLIENT_PORT } from "../../constants";

const baseURL = `ws://localhost:${CLIENT_PORT}`

export const chatSocket = io( `${baseURL}` );
export const eventsSocket = io( `${baseURL}/events` );
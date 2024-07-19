import {io} from "socket.io-client";

export const socket = io(`ws://192.168.1.4:8085`,{autoConnect: false});
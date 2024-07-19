import {io} from "socket.io-client";
import {useEffect, useState} from "react";

export function useSocket() {
    const socket = io('ws://192.168.1.4:8085',{autoConnect: false})
    useEffect(() => {
        socket.connect()
        return () => {
            socket.disconnect()
        }
    },[])
}
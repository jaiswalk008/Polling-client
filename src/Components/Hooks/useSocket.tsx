
import { io } from "socket.io-client";
import { useMemo } from "react";

const useSocket = () =>{
    const url:string = process.env.REACT_APP_BACKEND_URL as string;

    const socket = useMemo(()=> io(url),[]);
    return socket;
}

export default useSocket;
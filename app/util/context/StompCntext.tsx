import { Client } from "@stomp/stompjs";
import { createContext, useEffect, useRef, type ReactNode } from "react";
import SockJS from "sockjs-client";
import { EnvConfig } from "../envConfg";

export const SocketContext = createContext<Client | null>(null);
export const StompCOntextProvider = ({ children }: { children: ReactNode }) => {

    const CLientRef = useRef<Client | null>(null);

    if (!CLientRef.current) {
        try {
            CLientRef.current = new Client({
                webSocketFactory: () => new SockJS(`${EnvConfig.backend + "/" + EnvConfig.basePath}/ws`),
            })
        } catch (error: any) {

            console.log("fail websocket" + error?.message);
        }
    }

    useEffect(() => {
        try {
            CLientRef.current?.activate();
        } catch (error: any) {
            console.log("fail websocket" + error?.message);
        }
        return () => {
            CLientRef.current?.deactivate();
        }
    }, [])

    return (
        <SocketContext.Provider value={CLientRef.current}>
            {children}
        </SocketContext.Provider>
    )
}
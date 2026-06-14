import { ChannelType, type ChannelDTO, type ListChannelDTO, type ListServerDTO, type ServerDTO } from "@/types/auth.types";
import { EnvConfig } from "@/util/envConfg";
import { queryOptions } from "@tanstack/react-query";

const getllAllServers = (): Promise<ListServerDTO> => {
    // const data = await fetch(`${EnvConfig.backend}${EnvConfig.basePath}/`)
    const mockServers: ServerDTO[] = [];
    const dmChannelsButton: ServerDTO = {
        id: "@me",
        ownerAccId: 12982398,
        name: "Anon",
        iconUrl: "https://imgs.search.brave.com/sWjGYZRzN8jdbHYu9WYx2p29D92TaaSDg7qRXhqIuQg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTUv/NjM5Lzc4My9zbWFs/bC9pbGx1c3RyYXRp/b24taWNvbi1hYnN0/cmFjdC0zZC1yZWFs/aXN0aWMtY2hhdC1v/bmxpbmUtbWVzc2Fn/ZS1pc29sYXRlZC1v/bi1iYWNrZ3JvdW5k/LXZlY3Rvci5qcGc"
    }
    mockServers.push(dmChannelsButton);
    for (let i = 0; i < 14; i++) {
        const s: ServerDTO = {
            id: "232ASDUB232" + i,
            ownerAccId: 12982398,
            name: "random server",
            createdAt: 1781177400,
            iconUrl: "https://imgs.search.brave.com/2ZBX9hOQ0oV837nbaqb6yX1c7icXzns47Us4jP3WtTI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi91c2VyLXBy/b2ZpbGUtaWNvbi1z/dmctZG93bmxvYWQt/cG5nLTk3NTQ2MTMu/cG5nP2Y9d2VicCZ3/PTEyOA"
        };
        mockServers.push(s);
    }
    const allServers: ListServerDTO = {
        length: 14,
        servers: mockServers
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(allServers);
        }, 500);
    });
}

const getChannelsOfAserver = (serverId: String): Promise<ListChannelDTO> => {
    console.log("getChannelsOfAserver()");
    const channels: ChannelDTO[] = [];
    for (let i = 0; i < 10; i++) {
        let channel: ChannelDTO = {
            channelId: "128912HAS23" +i +serverId,
            channelName: "general Chat",
            channelType: ChannelType.TEXT,
            lastMessageAt: 1781337342,
        }
        channels.push(channel);
    }
    let vc: ChannelDTO = {
        channelId: "128912HAS23" + "VC",
        channelName: "general Chat",
        channelType: ChannelType.VOICE,
        lastMessageAt: 1781337342,
    }
    channels.push(vc);
    const result: ListChannelDTO = {
        length: channels.length,
        channels
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result)
        }, 500);
    });
}
export const getAllJoinedServers = queryOptions({
    queryKey: ["joinedServers"],
    queryFn: getllAllServers,
    staleTime:1000*60*5
})

export const getAllChannelOfAServer = (serverId: string) => queryOptions({
    queryKey: ["channels", serverId],
    queryFn: () => getChannelsOfAserver(serverId),
    staleTime:1000*60*5
})
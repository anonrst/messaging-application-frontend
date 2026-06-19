import {
  type APIResponse,
  type InboxMessageListDTO,
  type ListBatchChatMessageDTO,
  type ListChannelDTO,
  type ListDMUserDTO,
  type ListServerDTO,
  type ListUserDTO,
  type ServerDTO,
  type User,
} from "@/types/auth.types";
import { EnvConfig } from "@/util/envConfg";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const getllAllServers = (): Promise<ListServerDTO> => {
  console.log("getllAllServers()");
  return new Promise((resolve, reject) => {
    const res = fetch(
      `${EnvConfig.backend}${EnvConfig.basePath}/channels/getAllJoinedServers`,
      { credentials: "include" },
    );
    const dmChannelsButton: ServerDTO = {
      id: "@me",
      ownerAccId: 12982398,
      name: "Anon",
      iconUrl:
        "https://imgs.search.brave.com/sWjGYZRzN8jdbHYu9WYx2p29D92TaaSDg7qRXhqIuQg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTUv/NjM5Lzc4My9zbWFs/bC9pbGx1c3RyYXRp/b24taWNvbi1hYnN0/cmFjdC0zZC1yZWFs/aXN0aWMtY2hhdC1v/bmxpbmUtbWVzc2Fn/ZS1pc29sYXRlZC1v/bi1iYWNrZ3JvdW5k/LXZlY3Rvci5qcGc",
    };
    res.then((data) => {
      console.log(data);
      if (!data.ok) {
        console.log({ length: 1, servers: [dmChannelsButton] });
        resolve({ length: 1, servers: [dmChannelsButton] });
        return;
      }
      data.json().then((result: ListServerDTO) => {
        result.servers.splice(0, 0, dmChannelsButton);
        console.log(result.servers);
        resolve(result);
        return;
      });
    }).catch(error => {
      console.log({ length: 1, servers: [dmChannelsButton] });
      resolve({ length: 1, servers: [dmChannelsButton] });
      return;
    })
  });
};
export const getAllJoinedServers = queryOptions({
  queryKey: ["joinedServers"],
  queryFn: getllAllServers,
  staleTime: 1000 * 60 * 5,
  retry: false,
});

const getChannelsOfAserver = async (
  serverId: String,
): Promise<ListChannelDTO> => {
  console.log("getChannelsOfAserver()");
  const res = await fetch(
    `${EnvConfig.backend}${EnvConfig.basePath}/channels/getAllChannels?serverId=${serverId}`,
    { credentials: "include" },
  );
  if (!res.ok || res.status == 401) {
    throw new Error("you're not in server");
  }
  const channels: ListChannelDTO = await res.json();
  return channels;
};

export const getAllChannelOfAServer = (serverId: string) =>
  queryOptions({
    queryKey: ["channels", serverId],
    queryFn: () => getChannelsOfAserver(serverId),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
const getAllDmAccounts = async (): Promise<ListDMUserDTO> => {
  try {
    const res = await fetch(
      `${EnvConfig.backend}${EnvConfig.basePath}/friends`,
      { credentials: "include" },
    );
    if (!res.ok) {
      console.log("no friends")
      return { length: 0, friends: [] };
    }
    const friends: ListDMUserDTO = await res.json();
    console.log("friends");
    console.log(friends);
    return friends;
  } catch (error: any) {
    console.log(error.message)
    return { length: 0, friends: [] };
  }
};
export const getAllFriendsAccount = queryOptions({
  queryKey: ["friends"],
  queryFn: getAllDmAccounts,
});

const getALlMsgs = async (): Promise<InboxMessageListDTO> => {
  try {


    const res = await fetch(
      `${EnvConfig.backend}${EnvConfig.basePath}/friends/getMessages`,
      { credentials: "include" },
    );
    if (res.status == 404) {
      return { unReadLength: 0, messages: [], length: 0 };
    }
    else if (!res.ok) {
      console.log("no meesages");
    }
    const messages: InboxMessageListDTO = await res.json();
    console.log(messages);
    return messages;
  } catch (error) {
    return { unReadLength: 0, messages: [], length: 0 };
  }
}

export const getAllInboxMessages = queryOptions({
  queryKey: ["messages"],
  queryFn: getALlMsgs
})



const getBatchMessagesfChannel = async (channelId: number, meesageID?: number): Promise<ListBatchChatMessageDTO> => {
  const res = await fetch(`${EnvConfig.backend + "/" + EnvConfig.basePath}/channels/batch${meesageID && `?messageId=${meesageID}`}`);
  if (!res.ok) {
    throw new Error("network issue");
  }
  const data: ListBatchChatMessageDTO = await res.json();
  return data;
}

export const getRecentMessagesInBatch = (channelId: number, meesageID?: number) => queryOptions({
  queryKey: ["bbb", channelId, meesageID],
  queryFn: () => getBatchMessagesfChannel(channelId, meesageID),
});
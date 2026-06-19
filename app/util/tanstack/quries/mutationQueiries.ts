import type { APIResponse, ListUserDTO, ServerDTO, User, UserDTO } from "@/types/auth.types";
import { EnvConfig } from "@/util/envConfg";
import { mutationOptions, queryOptions, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
const CreataServer = async (serverName: string): Promise<ServerDTO> => {
  const res = await fetch(
    `${EnvConfig.backend + EnvConfig.basePath}/channels/createServer?serverName=${serverName}`, {
    credentials: "include"
  }
  );
  console.log(res);
  if (!res.ok) {
    throw new Error("failed to create Server");
  }
  const body: ServerDTO = await res.json();
  console.log(body);
  return body;
};
const sendLogoutRequest = async (): Promise<void> => {

  const res = await fetch(
    `${EnvConfig.backend}${EnvConfig.basePath}/oauth/refresh/logout`,
    {
      method: "POST",
      credentials: "include"
    },
  );
  if (!res.ok) {
    const data = await res.json();
    console.log(data);
    throw new Error("failed to logout");
  }
  return;

}

const joinServer = async (link: string): Promise<ServerDTO> => {
  const code = link.split("invite/")[1];
  const res = await fetch(`${EnvConfig.backend + EnvConfig.basePath}/invite?code=${code}`, { credentials: "include" });
  if (!res.ok) {
    const errorMessages: APIResponse = await res.json();
    throw new Error(errorMessages.message);
  }
  const body: ServerDTO = await res.json();
  return body;
};
export const createServerMutation = () =>
  useMutation({
    mutationFn: CreataServer,
  });
export const joinServerMutation = () =>
  useMutation({
    mutationFn: joinServer,
  });


export const getLogOut = () => useMutation({
  mutationFn: sendLogoutRequest,
});


const sendFriendRequestoUser = async (username: string): Promise<Boolean> => {
  console.log("sending result on " + username)
  const doUsernameExistres = await fetch(`${EnvConfig.backend}${EnvConfig.basePath}/friends/isUserExist?userName=${username}`,
    { credentials: "include" },
  );
  if (!doUsernameExistres.ok) {
    throw new Error("user don't exist");
  }
  const data: UserDTO = await doUsernameExistres.json();
  console.log(data);
  if (data == null) {
    console.log("user don't exist");
    throw new Error("user don't exist");
  }
  const userAccId = data.userAccId;
  const res = await fetch(`${EnvConfig.backend}${EnvConfig.basePath}/friends/sentFriendRequest?FriendAccId=${userAccId}`,
    {
      credentials: "include",
      method: "POST"
    }
  );
  if (!res.ok || res.status == 404) {
    const err: APIResponse = await res.json();
    console.log(err.message || "fail");
    throw new Error(err.message || "user don't exist");
  }
  const userData: User = await res.json();
  console.log(userData);
  return true;
}

export const sendFriendRequest = () => mutationOptions({
  mutationFn: sendFriendRequestoUser,
})

const acceptRequest = async (userAccId: number, messageId: number) => {
  const res = await fetch(`${EnvConfig.backend}${EnvConfig.basePath}/friends/acceptInvide?FriendAccId=${userAccId}&&messageId=${messageId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (res.status == 404) {
    throw new Error("wrong FriendAccId");
  } else if (!res.ok) {
    throw new Error("something wen't wrong");
  }
  const account: UserDTO = await res.json();
  console.log("stub: accept friend request for", account);
  return true;
};
export const acceptFriendRequest = () => mutationOptions({
  mutationFn: (vars: { userAccId: number, messageId: number }) => acceptRequest(vars.userAccId, vars.messageId)
});
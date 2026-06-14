export interface User {
     name: string,
     username: string,
     userAccId: string,
     profilePicURL?: string
}
export interface APIResponse {
     message: string;
     success: boolean;
}
export interface InitialUserAuthStateType {
     user: User | null,
     isAuthenticated: boolean
}

export interface ServerDTO {
     id: string,
     ownerAccId: number,
     name: string,
     iconUrl?: string,
     createdAt?: number,
}

export interface ListServerDTO {
     length: number,
     servers: ServerDTO[],
}

export interface ChannelDTO {
     channelId: String,
     channelName: String,
     channelType: ChannelType,
     lastMessageAt: number,
}
export interface ListChannelDTO {
     length: number,
     serverName?:string,
     channels: ChannelDTO[],
}

export enum ChannelType {
     DIRECT_MESSAGE,
     TEXT,
     VOICE
}
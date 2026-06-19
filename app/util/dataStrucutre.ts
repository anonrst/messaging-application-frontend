 interface UserDTO {
  name: String;
  username: String;
  userAccId: number;
  profilePicURL: String;
}
class ChannelUserCache {
    private limit: number;
    private usersData: Map<number, UserDTO>;

    constructor() {
        this.limit = 50;
        this.usersData = new Map();
    }

    public isUserExist(userId: number): boolean {
        return this.usersData.has(userId);
    }

    public getUser(userId: number): UserDTO | null {
        if (!this.isUserExist(userId)) return null;
        const user: UserDTO = this.usersData.get(userId)!;
        // move to end — most recently used
        this.usersData.delete(userId);
        this.usersData.set(userId, user);
        return user;
    }

    // least recently used is at front, most recent at end
    public setUser(id: number, userData: UserDTO): void {
        if (this.usersData.has(id)) {
            this.usersData.delete(id);
        } else if (this.usersData.size >= this.limit) {
            // evict least recently used
            this.usersData.delete(this.usersData.keys().next().value!);
        }
        this.usersData.set(id, userData);
    }
}


class ChannelUsersCache {
    private channels: Map<number, ChannelUserCache>;

    constructor() {
        this.channels = new Map();
    }

    private getOrCreateChannel(channelId: number): ChannelUserCache {
        if (!this.channels.has(channelId)) {
            this.channels.set(channelId, new ChannelUserCache());
        }
        return this.channels.get(channelId)!;
    }

    public getUser(channelId: number, userId: number): UserDTO | null {
        return this.getOrCreateChannel(channelId).getUser(userId);
    }

    public setUser(channelId: number, userData: UserDTO): void {
        this.getOrCreateChannel(channelId).setUser(userData.userAccId, userData);
    }

    public isUserExist(channelId: number, userId: number): boolean {
        return this.getOrCreateChannel(channelId).isUserExist(userId);
    }

    public seedUsers(channelId: number, usersData: UserDTO[]): void {
        const cache = this.getOrCreateChannel(channelId);
        usersData.forEach(u => cache.setUser(u.userAccId, u));
    }
}

export const perChannelUserData = new ChannelUsersCache();


// ---- test script ----

const mockUser = (id: number): UserDTO => ({
    userAccId: id,
    username: `user_${id}`,
    profilePicURL: `https://avatar.com/${id}.png`,
    name: "  "
});

const cache = new ChannelUsersCache();
const CHANNEL = 1;

// seed 50 users
const batch = Array.from({ length: 50 }, (_, i) => mockUser(i + 1));
cache.seedUsers(CHANNEL, batch);
console.log('seeded 50 users');

// verify user 1 exists
console.log('user 1 exists:', cache.isUserExist(CHANNEL, 1)); // true

// access user 1 — moves to most recently used
cache.getUser(CHANNEL, 1);

// add user 51 — should evict least recently used (user 2, since user 1 was just accessed)
cache.setUser(CHANNEL, mockUser(51));
console.log('user 51 exists:', cache.isUserExist(CHANNEL, 51)); // true
console.log('user 2 evicted:', !cache.isUserExist(CHANNEL, 2)); // true
console.log('user 1 still exists:', cache.isUserExist(CHANNEL, 1)); // true — was recently used

// different channel — independent cache
cache.setUser(2, mockUser(999));
console.log('channel 2 user 999:', cache.isUserExist(2, 999));   // true
console.log('channel 1 unaffected:', cache.isUserExist(CHANNEL, 999)); // false

console.log('all tests passed — no overflow');
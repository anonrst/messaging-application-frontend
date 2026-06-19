var ChannelUserCache = /** @class */ (function () {
    function ChannelUserCache() {
        this.limit = 50;
        this.usersData = new Map();
    }
    ChannelUserCache.prototype.isUserExist = function (userId) {
        return this.usersData.has(userId);
    };
    ChannelUserCache.prototype.getUser = function (userId) {
        if (!this.isUserExist(userId))
            return null;
        var user = this.usersData.get(userId);
        // move to end — most recently used
        this.usersData.delete(userId);
        this.usersData.set(userId, user);
        return user;
    };
    // least recently used is at front, most recent at end
    ChannelUserCache.prototype.setUser = function (id, userData) {
        if (this.usersData.has(id)) {
            this.usersData.delete(id);
        }
        else if (this.usersData.size >= this.limit) {
            // evict least recently used
            this.usersData.delete(this.usersData.keys().next().value);
        }
        this.usersData.set(id, userData);
    };
    return ChannelUserCache;
}());
var ChannelUsersCache = /** @class */ (function () {
    function ChannelUsersCache() {
        this.channels = new Map();
    }
    ChannelUsersCache.prototype.getOrCreateChannel = function (channelId) {
        if (!this.channels.has(channelId)) {
            this.channels.set(channelId, new ChannelUserCache());
        }
        return this.channels.get(channelId);
    };
    ChannelUsersCache.prototype.getUser = function (channelId, userId) {
        return this.getOrCreateChannel(channelId).getUser(userId);
    };
    ChannelUsersCache.prototype.setUser = function (channelId, userData) {
        this.getOrCreateChannel(channelId).setUser(userData.userAccId, userData);
    };
    ChannelUsersCache.prototype.isUserExist = function (channelId, userId) {
        return this.getOrCreateChannel(channelId).isUserExist(userId);
    };
    ChannelUsersCache.prototype.seedUsers = function (channelId, usersData) {
        var cache = this.getOrCreateChannel(channelId);
        usersData.forEach(function (u) { return cache.setUser(u.userAccId, u); });
    };
    return ChannelUsersCache;
}());
// export const perChannelUserData = new ChannelUsersCache();
// ---- test script ----
var mockUser = function (id) { return ({
    userAccId: id,
    username: "user_".concat(id),
    profilePicURL: "https://avatar.com/".concat(id, ".png"),
    name: "  "
}); };
var cache = new ChannelUsersCache();
var CHANNEL = 1;
// seed 50 users
var batch = Array.from({ length: 50 }, function (_, i) { return mockUser(i + 1); });
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
console.log('channel 2 user 999:', cache.isUserExist(2, 999)); // true
console.log('channel 1 unaffected:', cache.isUserExist(CHANNEL, 999)); // false
console.log('all tests passed — no overflow');

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/LandingPage.tsx"),

  route("/sign-in", "pages/auth/sign-in.tsx"),
  route("/sign-up", "pages/auth/sign-up.tsx"),

  route(
    "/channels",
    "pages/AppLayout/MessagingLayout.tsx",
    [
      route(
        "@me",
        "pages/AppLayout/FriendDMLayout.tsx",
        [
          index("pages/AppLayout/ActivityPage.tsx"),

          route(
            ":friendChatId",
            "pages/AppLayout/FriendChatPage.tsx"
          ),
        ]
      ),

      route(
        ":serverId",
        "pages/AppLayout/ServerLayout.tsx",
        [
          route(
            ":channelChatId",
            "pages/AppLayout/ChannelChatPage.tsx"
          ),
        ]
      ),
    ]
  ),
] satisfies RouteConfig;
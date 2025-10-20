import { defineMiniApp } from "@base-org/minikit";

export default defineMiniApp({
  id: "farcaster-bingo-fun",
  name: "Farcaster Bingo Fun 🎯",
  description:
    "A Farcaster-integrated bingo mini-game built with React and Express. Play, earn, and share your scores directly on Base!",
  websiteUrl: "https://farcasterbingofun.vercel.app",
  icon: "/icon.png",
  screenshots: ["/screenshot1.png"],
  categories: ["games", "social"],
  defaultPath: "/",
  developer: {
    name: "Argostroloji",
    url: "https://farcaster.xyz/argostroloji",
  },
  accountAssociation: {
    type: "eip4361",
    payload: "0x0000000000000000000000000000000000000000",
    signature: "0x",
  },
});

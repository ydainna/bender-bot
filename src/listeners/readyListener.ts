import { ActivityType, Client } from "discord.js";
import { Commands } from "../Commands";

export const readyListener = {
  name: "ready",

  execute: async (client: Client) => {
    if (!client.user || !client.application) {
      return;
    }
    client.user.setPresence({
      status: "online",
      activities: [
        {
          name: "click click l'ordinateur",
          type: ActivityType.Playing,
        },
      ],
    });
    await client.application.commands.set(Commands);

    console.log(`[Bot] ${client.user.username} is online`);
  },
};

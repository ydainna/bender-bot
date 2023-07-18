import { ActivityType, Client } from "discord.js";
import { Commands } from "../Commands";
import { getLogger } from "../utils/getLogger";

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

    const log = getLogger("Bot");
    log.info(`${client.user.username} is online`);
  },
};

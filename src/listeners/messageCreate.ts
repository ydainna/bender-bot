import { ChannelType, Client, Message } from "discord.js";
import { logger } from "../utils/logger";

export const messageCreate = {
  name: "messageCreate",

  execute: async (client: Client, message: Message) => {
    if (message.channel.type === ChannelType.DM) {
      const log = logger("Bot");
      log.info(`DM from ${message.author.tag}: ${message.content}`);
      return;
    }
  },
};

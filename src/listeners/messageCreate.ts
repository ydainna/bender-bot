import { ChannelType, Client, Message } from "discord.js";
import { getLogger } from "../utils/getLogger";

export const messageCreate = {
  name: "messageCreate",

  execute: async (client: Client, message: Message) => {
    if (message.channel.type === ChannelType.DM) {
      const log = getLogger("Bot");
      log.info(`DM from ${message.author.tag}: ${message.content}`);
      return;
    }
  },
};

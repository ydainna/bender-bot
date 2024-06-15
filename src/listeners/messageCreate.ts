import { ChannelType, Client, Message } from "discord.js";

export const messageCreate = {
  name: "messageCreate",

  execute: async (client: Client, message: Message) => {
    if (message.channel.type === ChannelType.DM) {
      console.log(`[Bot] DM from ${message.author.tag}: ${message.content}`);
      return;
    }
  },
};

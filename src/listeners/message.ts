import { ChannelType, Client, Message } from "discord.js";

export const message = {
  name: "messageCreate",

  execute: async (client: Client, message: Message) => {
    if (message.channel.type === ChannelType.DM) {
      console.log("DM message");
      return;
    }
  },
};

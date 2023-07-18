import { Client, EmbedBuilder, Message, TextChannel } from "discord.js";
import { getLogger } from "../utils/getLogger";

export const messageUpdateListener = {
  name: "messageUpdate",

  execute: async (client: Client, oldMessage: Message, newMessage: Message) => {
    if (oldMessage.author.bot) {
      return;
    }

    if (oldMessage.content === newMessage.content) {
      return;
    }

    let count = 1950;

    let originalMessage = oldMessage.content.slice(0, count) + (oldMessage.content.length > 1950 ? "..." : "");
    let editedMessage = newMessage.content.slice(0, count) + (newMessage.content.length > 1950 ? "..." : "");

    const embed = new EmbedBuilder()
      .setTitle(`Message edité`)
      .setDescription(
        `Un [message](${newMessage.url}) par ${newMessage.author} a été **edité** dans ${newMessage.channel}.\n
      **Message original**:\n ${originalMessage} \n **Message modifié**:\n ${editedMessage}`.slice(0, 4096)
      )
      .setThumbnail(oldMessage.author?.displayAvatarURL({ forceStatic: false }))
      .setFooter({
        text: oldMessage.author.username,
        iconURL: oldMessage.author.displayAvatarURL(),
      })
      .setColor("#FF0000")
      .setTimestamp();

    let channel = client.channels.cache.get("870603102112325673") as TextChannel;

    const log = getLogger("MessageUpdateListener");
    log.info(`The member ${oldMessage.author.username} has edited message ${oldMessage.content}`);
    channel?.send({ embeds: [embed] });
  },
};

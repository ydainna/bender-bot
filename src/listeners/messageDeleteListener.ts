import { Client, EmbedBuilder, Message, TextChannel } from "discord.js";
import { getLogger } from "../utils/getLogger";

export const messageDeleteListener = {
  name: "messageDelete",

  execute: async (client: Client, message: Message) => {
    const embed = new EmbedBuilder()
      .setTitle(`Message supprimer`)
      .setDescription(
        `Un [message](${message.url}) par ${message.author} a été **supprimer** dans ${message.channel}.\n
      **Message**:\n ${message.content ? message.content : "Aucun message"}`.slice(0, 4096)
      )
      .setThumbnail(message.author?.displayAvatarURL({ forceStatic: false }))
      .setFooter({
        text: message.author.username,
        iconURL: message.author.displayAvatarURL(),
      })
      .setColor("#FF0000")
      .setTimestamp();

    if (message.attachments.size >= 1) {
      embed.addFields({ name: `Attachment:`, value: `${message.attachments.map((a) => a.url)}` });
    }

    let channel = client.channels.cache.get("870603102112325673") as TextChannel;

    const log = getLogger("InteractionCreateListener");
    log.info(`The member ${message.author.username} has deleted the message ${message.content}`);
    channel?.send({ embeds: [embed] });
  },
};

import { Client, Interaction, EmbedBuilder, TextChannel } from "discord.js";
import { getLogger } from "../utils/getLogger";

export const guildMemberRemoveListener = {
  name: "guildMemberRemove",

  execute: async (client: Client, interaction: Interaction) => {
    const embed = new EmbedBuilder()
      .setTitle(`Un membre vient de partir 😭`)
      .setDescription(`**${interaction.user?.username}**#${interaction.user.discriminator} viens de quitter le serveur`)
      .setThumbnail(interaction.user?.displayAvatarURL({ forceStatic: false }))
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor("#FF0000")
      .setTimestamp();

    let channel = client.channels.cache.get("870603102112325673") as TextChannel;
    const log = getLogger("GuildMemberRemoveListener");
    log.info(`The member ${interaction.user.username} has leave the server ${interaction.guild?.name}`);
    channel?.send({ embeds: [embed] });
  },
};

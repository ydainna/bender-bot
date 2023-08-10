import { Client, Interaction, EmbedBuilder, TextChannel } from "discord.js";
import { getLogger } from "../utils/getLogger";

export const guildMemberAddListener = {
  name: "guildMemberAdd",

  execute: async (client: Client, interaction: Interaction) => {
    const embed = new EmbedBuilder()
      .setTitle(`Un membre vient d'arriver !`)
      .setDescription(`**${interaction.user.username}**#${interaction.user.discriminator} a rejoint le serveur`)
      .setThumbnail(interaction.user?.displayAvatarURL({ forceStatic: false }))
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor("#00FF21")
      .setTimestamp();

    let channel = client.channels.cache.get("870363038082007065") as TextChannel;
    const log = getLogger("GuildMemberAddListener");
    log.info(`The member ${interaction.user.username} has joined the server ${interaction.guild?.name}`);
    channel?.send({ embeds: [embed] });
  },
};

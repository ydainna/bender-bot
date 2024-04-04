import { EmbedBuilder, CommandInteraction } from "discord.js";

export async function error(message: string, interaction: CommandInteraction) {
  let error: EmbedBuilder = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("Il y a une erreur dans le système de Vagos")
    .setDescription(`${message}`)
    .setFooter({
      text: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp();
  await interaction.editReply({
    embeds: [error],
  });
}

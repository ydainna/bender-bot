import { CommandInteraction, Client, EmbedBuilder, ApplicationCommandType } from "discord.js";
import { Command } from "../../Command";
import prettyMilliseconds from "pretty-ms";

export const InfoCommand: Command = {
  name: "info",
  description: "Info about the bot",
  type: ApplicationCommandType.ChatInput,
  ephemeral: false,

  run: async (client: Client, interaction: CommandInteraction) => {
    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor("#FFFFFF")
      .setTitle("Information(s)")
      .setDescription(`Le bot est en ligne depuis **${prettyMilliseconds(client.uptime as number)}**`)
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/1076/1076337.png")
      .setTimestamp()
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.editReply({
      embeds: [embed],
    });
  },
};

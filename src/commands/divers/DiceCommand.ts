import { CommandInteraction, Client, EmbedBuilder, ApplicationCommandType } from "discord.js";
import { getRandomInt } from "../../utils/getRandomInt";
import { Command } from "../../Command";

export const DiceCommand: Command = {
  name: "dice",
  description: "Random dice roll",
  type: ApplicationCommandType.ChatInput,
  ephemeral: false,

  run: async (client: Client, interaction: CommandInteraction) => {
    const randomNumber: number = getRandomInt(1, 100);
    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor("#FFFFFF")
      .setTitle("Dice")
      .setDescription(`${interaction.user.username} a eu **${randomNumber}** au lancer de dés`)
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/7101/7101743.png")
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

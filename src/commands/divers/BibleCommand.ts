import { CommandInteraction, Client, EmbedBuilder, ApplicationCommandType } from "discord.js";
import { Command } from "../../Command";
import { getRandomInt } from "../../utils/getRandomInt";

export const BibleCommand: Command = {
  name: "bible",
  description: "Random verse from the bible",
  type: ApplicationCommandType.ChatInput,
  ephemeral: false,

  run: async (client: Client, interaction: CommandInteraction) => {
    const getBible = await fetch(`https://api.getbible.net/v2/ls1910/${getRandomInt(1, 66)}/chapters.json`);

    const json = await getBible.json();

    const bookName = json.results[0].book_name;
    const name = json.results[0].name;
    const chapterUrl = json.results[0].url;

    const embed = new EmbedBuilder()
      .setColor("#FF6A00")
      .addFields({
        name: `${bookName} + " (" + ${name} + ")`,
        value: "TODO",
      })
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/2600/2600768.png")
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

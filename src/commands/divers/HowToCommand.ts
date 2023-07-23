import { CommandInteraction, Client, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { getRandomInt } from "../../utils/getRandomInt";
import { Command } from "../../Command";

export const HowToCommand: Command = {
  name: "howto",
  description: "how to description",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "how",
      description: "How to gay or jewish ?",
      choices: [
        {
          name: "jewish",
          value: "howto_jewhish",
        },
        {
          name: "gay",
          value: "howto_gay",
        },
      ],
    },
  ],
  ephemeral: false,

  run: async (client: Client, interaction: CommandInteraction) => {
    const randomValue: number = getRandomInt(0, 100);
    const value: string | number | boolean | undefined = interaction.options.get("how")?.value;
    const embedJewish: EmbedBuilder = new EmbedBuilder()
      .setColor("#0026FF")
      .addFields({ name: "How to jewish ?", value: "Vous êtes à " + randomValue + "% juif" })
      .setTitle("Jewish machine")
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/4065/4065228.png")
      .setTimestamp()
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    const embedGay: EmbedBuilder = new EmbedBuilder()
      .setColor("#B200FF")
      .addFields({ name: "How to gay ?", value: "Vous êtes à " + randomValue + "% gay" })
      .setTitle("Gay machine")
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/7832/7832011.png")
      .setTimestamp()
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });
    if (value === "howto_jewhish") {
      await interaction.editReply({
        embeds: [embedJewish],
      });
    }
    if (value === "howto_gay") {
      await interaction.editReply({
        embeds: [embedGay],
      });
    }
  },
};

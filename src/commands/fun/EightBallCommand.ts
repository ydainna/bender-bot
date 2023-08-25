import { CommandInteraction, Client, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { getRandomInt } from "../../utils/getRandomInt";
import { Command } from "../../Command";

const responses = [
  "Essaye plus tard",
  "D'après moi oui",
  "C'est non",
  "Essaye encore",
  "C'est certain",
  "Peu probable",
  "Pas d'avis",
  "Oui absolument",
  "Faut pas rêver",
  "C'est ton destin",
  "Tu peux compter dessus",
  "N'y compte pas",
  "Le sort en est jeté",
  "Sans aucun doute",
  "Impossible",
  "Une chance sur deux",
  "Très probable",
  "Repose ta question",
  "Oui",
  "C'est bien parti",
  "ERREUR DANS LE SYSTEME DE VAGOS",
];

export const EightBallCommand: Command = {
  name: "8ball",
  description: "Ask the magic Ball a question",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "ask",
      description: "Ask your question to the magic ball",
    },
  ],
  ephemeral: false,

  run: async (client: Client, interaction: CommandInteraction) => {
    const randomResponse: string = responses[getRandomInt(0, responses.length - 1)];
    const ask: string | number | boolean | undefined = interaction.options.get("ask")?.value;
    const embed: EmbedBuilder = new EmbedBuilder()
      .setColor("#000000")
      .addFields({ name: ask as string, value: randomResponse })
      .setTitle("Magic 8-Ball")
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/469/469626.png")
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

import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../../Command";

export const TestCommand: Command = {
  name: "test",
  description: "zizi",
  type: ApplicationCommandType.ChatInput,
  ephemeral: true,

  run: async (client: Client, interaction: CommandInteraction) => {
    await interaction.followUp("zizi");
  },
};

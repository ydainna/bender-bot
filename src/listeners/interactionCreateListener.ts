import { CommandInteraction, Client, Interaction, ChannelType } from "discord.js";
import { Commands } from "../Commands";
import { getLogger } from "../utils/getLogger";

export const interactionCreateListener = {
  name: "interactionCreate",

  execute: async (client: Client, interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  },
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred", ephemeral: true });
    return;
  }

  const log = getLogger("InteractionCreateListener");
  log.info(`Executing command ${slashCommand.name} for ${interaction.user.username}`);
  await interaction.deferReply({ ephemeral: slashCommand.ephemeral });

  slashCommand.run(client, interaction);
};

import { CommandInteraction, Client, ApplicationCommandType, GuildMember, Role, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../Command";
import { error } from "../../utils/error";

export const PrivateMessageCommand: Command = {
  name: "private-message",
  description: "Send a private message",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "mention",
      description: "Username to send the message to",
    },
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "message",
      description: "Message to send to the user",
    },
  ],
  ephemeral: true,

  run: async (client: Client, interaction: CommandInteraction) => {
    const userMention: string | number | boolean | undefined = interaction.options.get("mention")?.value;
    const userId: string | undefined = userMention?.toString().replace(/[^0-9]/g, "");

    if (!userMention || !userId) {
      error("L'utilisateur n'a pas été trouver ou n'existe pas", interaction);
      return;
    }

    const roleID: string = "1163990369302753301";

    const { guild, member } = interaction;

    if (!guild || !member) {
      error("La guilde ou le membre n'a pas été trouver ou n'existe pas", interaction);
      return;
    }

    const adminRole: Role | null = await guild.roles.fetch(roleID);

    if (!adminRole) {
      error("Le rôle n'a pas été trouver ou n'existe pas", interaction);
      return;
    }

    if ((member as GuildMember).roles.cache.has(adminRole.id)) {
      const message = interaction.options.get("message")?.value as string | undefined;
      if (message) {
        client.users.send(userId || "", message);
      }

      await interaction.followUp({
        content: "Message envoyé !",
      });
    } else {
      await interaction.followUp({
        content: "Vous n'avez pas la permission d'envoyer ce message",
      });
    }
  },
};

import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, Client, EmbedBuilder, User, GuildMember } from "discord.js";
import { Command } from "../../Command";
import { DateTime } from "luxon";

export const UserInformationCommand: Command = {
  name: "userinfo",
  description: "Get user information",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
      name: "mention",
      description: "User for mention",
    },
  ],
  ephemeral: false,

  run: async (client: Client, interaction: CommandInteraction) => {
    const userId: string | number | boolean | undefined = interaction.options.get("mention")?.value;
    const user: User = await client.users.fetch(userId as string);
    const isUserBot: string = user.bot ? "yes" : "no";
    const memberGuild: GuildMember | undefined = interaction.guild?.members.cache.get(userId as string);
    const embed: EmbedBuilder = new EmbedBuilder()
      .setTitle(`${user.username}'s Information`)
      .setThumbnail(user.displayAvatarURL({ forceStatic: false }))
      .addFields(
        { name: "User", value: `\`${user.username}\``, inline: true },
        { name: "Bot", value: `\`${isUserBot}\``, inline: true },
        {
          name: "Roles",
          value: `${memberGuild?.roles.cache
            .map((r) => r)
            .join("")
            .replace("@everyone", "")}`,
          inline: true,
        },
        { name: "Highest Role", value: `${memberGuild?.roles.highest}`, inline: true },
        { name: "Joined at", value: `\`${DateTime.fromJSDate(memberGuild?.joinedAt as Date).toFormat("dd LLLL yyyy")}\``, inline: true },
        { name: "Created at", value: `\`${DateTime.fromJSDate(user.createdAt).toFormat("dd LLLL yyyy")}\``, inline: true }
      )
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor("#FF6A00")
      .setTimestamp();

    await interaction.editReply({
      embeds: [embed],
    });
  },
};

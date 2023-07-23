import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, Client, EmbedBuilder, User, GuildMember } from "discord.js";
import moment from "moment";
import { Command } from "../../Command";

export const UserInformationCommand: Command = {
  name: "userinfo",
  description: "Get user information",
  type: ApplicationCommandType.ChatInput,
  ephemeral: false,
  options: [
    {
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
      name: "mention",
      description: "User for mention",
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const userId: string | number | boolean | undefined = interaction.options.get("mention")?.value;
    const user: User = await client.users.fetch(userId as string);
    const memberGuild: GuildMember | undefined = interaction.guild?.members.cache.get(userId as string);
    const embed: EmbedBuilder = new EmbedBuilder()
      .setTitle(`${user.username}'s Information`)
      .setThumbnail(user.displayAvatarURL({ forceStatic: false }))
      .addFields(
        { name: "User", value: `\`${user.username}\``, inline: true },
        { name: "Discrim-inator", value: `\`#${user.discriminator}\``, inline: true },
        { name: "ID", value: `\`${user.id}\``, inline: true },
        { name: "Bot", value: `\`${user.bot}\``, inline: true },
        {
          name: "Roles",
          value: `${memberGuild?.roles.cache
            .map((r) => r)
            .join("")
            .replace("@everyone", "")}`,
          inline: true,
        },
        { name: "Highest Role", value: `${memberGuild?.roles.highest}`, inline: true },
        { name: "Joined at", value: `\`${moment(memberGuild?.joinedAt).format("DD MMMM YYYY")}\``, inline: true },
        { name: "Created at", value: `\`${moment(user.createdAt).format("DD MMMM YYYY")}\``, inline: true }
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
